import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';

import { COOKIE_OPTIONS, authController } from 'src/controllers/auth';

import {
  USER_MOCK_DATA,
  generateRequestMock,
  generateResponseMock,
  nextMock,
  readFromFileSpy,
  writeErrorToFileSpy
} from 'src/util/mocks';

jest.mock('argon2');
jest.mock('jsonwebtoken');

describe('Auth controller', () => {
  const argon2VerifySpy = jest.spyOn(argon2, 'verify');
  const argon2HashSpy = jest.spyOn(argon2, 'hash');
  const jwtSignSpy = jest.spyOn(jwt, 'sign');
  const jwtVerifySpy = jest.spyOn(jwt, 'verify');

  beforeEach(() => {
    writeErrorToFileSpy.mockReset();
    jwtSignSpy
      .mockReset()
      .mockImplementation(jest.fn().mockReturnValue('signed-token'));
    jwtVerifySpy.mockReset().mockImplementation(
      jest.fn().mockReturnValue({
        email: USER_MOCK_DATA.email,
        password: USER_MOCK_DATA.password,
        exp: Date.now()
      })
    );
    argon2VerifySpy.mockReset().mockResolvedValue(false);
    argon2HashSpy.mockReset().mockResolvedValue('hashed-password');
  });

  describe('signIn function', () => {
    it('should return status 400 if no email field', async () => {
      const responseMock = generateResponseMock();

      await authController.signIn(
        generateRequestMock({}),
        responseMock,
        nextMock
      );

      expect(writeErrorToFileSpy).toBeCalledWith(
        'Error: Email must be provided!'
      );
    });

    it('should return status 400 if email is not valid', async () => {
      const responseMock = generateResponseMock();

      await authController.signIn(
        generateRequestMock({ email: 't' }),
        responseMock,
        nextMock
      );

      expect(writeErrorToFileSpy).toBeCalledWith(
        'Error: Email address must be valid!'
      );
    });

    it('should return status 404 if email do not match', async () => {
      readFromFileSpy.mockReturnValue([USER_MOCK_DATA]);
      const responseMock = generateResponseMock();

      await authController.signIn(
        generateRequestMock({
          email: 't@t.com',
          password: 'test'
        }),
        responseMock,
        nextMock
      );

      expect(writeErrorToFileSpy).toBeCalledWith('Error: No user found in DB!');
    });

    it('should return status 400 if password is not provided', async () => {
      readFromFileSpy.mockReturnValue([USER_MOCK_DATA]);
      const responseMock = generateResponseMock();

      await authController.signIn(
        generateRequestMock({
          email: USER_MOCK_DATA.email
        }),
        responseMock,
        nextMock
      );

      expect(writeErrorToFileSpy).toBeCalledWith(
        'Error: Password must be provided!'
      );
    });

    it('should return status 400 if password do not match', async () => {
      readFromFileSpy.mockReturnValue([USER_MOCK_DATA]);
      const responseMock = generateResponseMock();

      await authController.signIn(
        generateRequestMock({
          email: USER_MOCK_DATA.email,
          password: 'test'
        }),
        responseMock,
        nextMock
      );

      expect(writeErrorToFileSpy).toBeCalledWith('Error: Invalid password!');
    });

    it('should return status 200 if user is sign in', async () => {
      readFromFileSpy.mockReturnValue([USER_MOCK_DATA]);
      const responseMock = generateResponseMock();
      argon2VerifySpy.mockResolvedValue(true);

      await authController.signIn(
        generateRequestMock({
          email: USER_MOCK_DATA.email,
          password: 'test'
        }),
        responseMock,
        nextMock
      );

      const { password, ...rest } = USER_MOCK_DATA;
      expect(jwtSignSpy).toBeCalledTimes(2);
      expect(responseMock.cookie).toBeCalledWith(
        'jwt',
        'signed-token',
        COOKIE_OPTIONS
      );
      expect(responseMock.status).toBeCalledWith(200);
      expect(responseMock.status().json).toBeCalledWith({
        data: {
          ...rest,
          isLoggedIn: true,
          token: 'signed-token'
        },
        message: 'User is sign in successfully',
        status: 200
      });
    });
  });

  describe('autoSignIn function', () => {
    it('should return status 403 if token is expired', async () => {
      const responseMock = generateResponseMock();
      jwtVerifySpy.mockImplementation(
        jest.fn().mockReturnValue({
          exp: 100
        })
      );

      await authController.autoSignIn(
        generateRequestMock({}),
        responseMock,
        nextMock
      );

      expect(writeErrorToFileSpy).toBeCalledWith(
        'Error: Token expired, please login again'
      );
    });

    it('should return status 400 if no email field', async () => {
      const responseMock = generateResponseMock();
      jwtVerifySpy.mockImplementation(
        jest.fn().mockReturnValue({
          email: '',
          exp: Date.now()
        })
      );

      await authController.autoSignIn(
        generateRequestMock({}),
        responseMock,
        nextMock
      );

      expect(writeErrorToFileSpy).toBeCalledWith(
        'Error: Email must be provided!'
      );
    });

    it('should return status 400 if email is not valid', async () => {
      const responseMock = generateResponseMock();
      jwtVerifySpy.mockImplementation(
        jest.fn().mockReturnValue({
          email: 't',
          exp: Date.now()
        })
      );

      await authController.autoSignIn(
        generateRequestMock({}),
        responseMock,
        nextMock
      );

      expect(writeErrorToFileSpy).toBeCalledWith(
        'Error: Email address must be valid!'
      );
    });

    it('should return status 404 if email do not match', async () => {
      readFromFileSpy.mockReturnValue([USER_MOCK_DATA]);
      const responseMock = generateResponseMock();
      jwtVerifySpy.mockImplementation(
        jest.fn().mockReturnValue({
          email: 't@t.com',
          password: 'test',
          exp: Date.now()
        })
      );

      await authController.autoSignIn(
        generateRequestMock({}),
        responseMock,
        nextMock
      );

      expect(writeErrorToFileSpy).toBeCalledWith('Error: No user found in DB!');
    });

    it('should return status 400 if password is not provided', async () => {
      readFromFileSpy.mockReturnValue([USER_MOCK_DATA]);
      const responseMock = generateResponseMock();
      jwtVerifySpy.mockImplementation(
        jest.fn().mockReturnValue({
          password: '',
          email: USER_MOCK_DATA.email,
          exp: Date.now()
        })
      );

      await authController.autoSignIn(
        generateRequestMock({}),
        responseMock,
        nextMock
      );

      expect(writeErrorToFileSpy).toBeCalledWith(
        'Error: Password must be provided!'
      );
    });

    it('should return status 400 if password do not match', async () => {
      readFromFileSpy.mockReturnValue([USER_MOCK_DATA]);
      const responseMock = generateResponseMock();

      await authController.autoSignIn(
        generateRequestMock({}),
        responseMock,
        nextMock
      );

      expect(writeErrorToFileSpy).toBeCalledWith('Error: Invalid password!');
    });

    it('should return status 200 if user is sign in', async () => {
      readFromFileSpy.mockReturnValue([USER_MOCK_DATA]);
      const responseMock = generateResponseMock();
      argon2VerifySpy.mockResolvedValue(true);

      await authController.autoSignIn(
        generateRequestMock({}),
        responseMock,
        nextMock
      );

      const { password, ...rest } = USER_MOCK_DATA;
      expect(jwtSignSpy).toBeCalledTimes(2);
      expect(responseMock.cookie).toBeCalledWith(
        'jwt',
        'signed-token',
        COOKIE_OPTIONS
      );
      expect(responseMock.status).toBeCalledWith(200);
      expect(responseMock.status().json).toBeCalledWith({
        data: {
          ...rest,
          isLoggedIn: true,
          token: 'signed-token'
        },
        message: 'User is sign in successfully',
        status: 200
      });
    });
  });

  describe('signUp function', () => {
    it('should return status 400 if no email field', async () => {
      const responseMock = generateResponseMock();

      await authController.signUp(
        generateRequestMock({}),
        responseMock,
        nextMock
      );

      expect(writeErrorToFileSpy).toBeCalledWith(
        'Error: Email must be provided!'
      );
    });

    it('should return status 400 if email is not valid', async () => {
      const responseMock = generateResponseMock();

      await authController.signUp(
        generateRequestMock({ email: 't' }),
        responseMock,
        nextMock
      );

      expect(writeErrorToFileSpy).toBeCalledWith(
        'Error: Email address must be valid!'
      );
    });

    it('should return status 400 if no password field', async () => {
      const responseMock = generateResponseMock();

      await authController.signUp(
        generateRequestMock({ email: 'test@test.com' }),
        responseMock,
        nextMock
      );

      expect(writeErrorToFileSpy).toBeCalledWith(
        'Error: Password must be provided!'
      );
    });

    it('should return status 400 if password is not strong enough', async () => {
      const responseMock = generateResponseMock();

      await authController.signUp(
        generateRequestMock({ email: 'test@test.com', password: 'test' }),
        responseMock,
        nextMock
      );

      expect(writeErrorToFileSpy).toBeCalledWith(
        'Error: Password is not strong enough!(min 8 char | number | special char)'
      );
    });

    it('should return status 409 if user with this email is in db', async () => {
      readFromFileSpy.mockReturnValue([USER_MOCK_DATA]);
      const responseMock = generateResponseMock();

      await authController.signUp(
        generateRequestMock({
          email: USER_MOCK_DATA.email,
          password: 'test123?'
        }),
        responseMock,
        nextMock
      );

      expect(writeErrorToFileSpy).toBeCalledWith(
        'Error: User already exist. Please login!'
      );
    });

    it('should return status 200 if user is sign in', async () => {
      readFromFileSpy.mockReturnValue([USER_MOCK_DATA]);
      const responseMock = generateResponseMock();

      await authController.signUp(
        generateRequestMock({
          email: 'new@email.com',
          password: 'test123?'
        }),
        responseMock,
        nextMock
      );

      const { password, ...rest } = USER_MOCK_DATA;
      expect(argon2HashSpy).toBeCalledTimes(1);
      expect(jwtSignSpy).toBeCalledTimes(2);
      expect(responseMock.status).toBeCalledWith(201);
      expect(responseMock.status().json).toBeCalledWith({
        data: {
          ...rest,
          isLoggedIn: true,
          email: 'new@email.com',
          token: 'signed-token',
          id: expect.any(String)
        },
        message: 'User is sign up successfully',
        status: 201
      });
    });
  });
});
