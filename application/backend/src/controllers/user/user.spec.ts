import { userController } from 'src/controllers/user';

import {
  USER_MOCK_DATA,
  generateRequestMock,
  generateResponseMock,
  nextMock,
  readFromFileSpy,
  writeErrorToFileSpy
} from 'src/util/mocks';

describe('User controller', () => {
  const PARAMETERS = { id: 'user_id' };

  beforeEach(() => {
    readFromFileSpy.mockReset();
    writeErrorToFileSpy.mockReset();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('getUser function', () => {
    it('should return status 404 if no user in db', async () => {
      readFromFileSpy.mockReturnValue([]);
      const responseMock = generateResponseMock();

      await userController.getUser(
        generateRequestMock({}, PARAMETERS),
        responseMock,
        nextMock
      );

      expect(readFromFileSpy).toHaveBeenCalledTimes(1);
      expect(writeErrorToFileSpy).toHaveBeenCalledWith(
        `Error: User with ${USER_MOCK_DATA.id} was not found`
      );
    });

    it('should return status 200 if user is in db', async () => {
      readFromFileSpy.mockReturnValue([USER_MOCK_DATA]);
      const responseMock = generateResponseMock();

      await userController.getUser(
        generateRequestMock({}, PARAMETERS),
        responseMock,
        nextMock
      );

      const { password: pass, ...rest } = USER_MOCK_DATA;
      expect(readFromFileSpy).toHaveBeenCalledTimes(1);
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.status().json).toHaveBeenCalledWith({
        data: rest,
        message: 'Fetch user successful',
        status: 200
      });
    });

    it('should throw error and call writeErrorToFile and next function if exception happen', async () => {
      const error = new Error('Error occurred!');
      readFromFileSpy.mockImplementation(() => {
        throw error;
      });
      const responseMock = generateResponseMock();

      await userController.getUser(
        generateRequestMock({}, PARAMETERS),
        responseMock,
        nextMock
      );

      expect(readFromFileSpy).toHaveBeenCalledTimes(1);
      expect(writeErrorToFileSpy).toHaveBeenCalledWith(
        'Error: Error occurred!'
      );
      expect(nextMock).toHaveBeenCalledWith(error);
    });
  });

  describe('updateUser function', () => {
    it('should return status 404 if no user in db', async () => {
      readFromFileSpy.mockReturnValue([]);
      const responseMock = generateResponseMock();

      await userController.updateUser(
        generateRequestMock({}, PARAMETERS),
        responseMock,
        nextMock
      );

      expect(readFromFileSpy).toHaveBeenCalledTimes(1);
      expect(writeErrorToFileSpy).toHaveBeenCalledWith(
        `Error: User with ${USER_MOCK_DATA.id} was not found`
      );
    });

    it('should return status 400 if firstName is not set', async () => {
      readFromFileSpy.mockReturnValue([USER_MOCK_DATA]);
      const responseMock = generateResponseMock();

      await userController.updateUser(
        generateRequestMock(USER_MOCK_DATA, PARAMETERS),
        responseMock,
        nextMock
      );

      expect(readFromFileSpy).toHaveBeenCalledTimes(1);
      expect(writeErrorToFileSpy).toHaveBeenCalledWith(
        'Error: First name must be provided!'
      );
    });

    it('should return status 400 if lastName is not set', async () => {
      readFromFileSpy.mockReturnValue([USER_MOCK_DATA]);
      const responseMock = generateResponseMock();

      await userController.updateUser(
        generateRequestMock(
          { ...USER_MOCK_DATA, firstName: 'John' },
          PARAMETERS
        ),
        responseMock,
        nextMock
      );

      expect(readFromFileSpy).toHaveBeenCalledTimes(1);
      expect(writeErrorToFileSpy).toHaveBeenCalledWith(
        'Error: Last name must be provided!'
      );
    });

    it('should return status 400 if age is not set', async () => {
      readFromFileSpy.mockReturnValue([USER_MOCK_DATA]);
      const responseMock = generateResponseMock();

      await userController.updateUser(
        generateRequestMock(
          { ...USER_MOCK_DATA, firstName: 'John', lastName: 'Doe' },
          PARAMETERS
        ),
        responseMock,
        nextMock
      );

      expect(readFromFileSpy).toHaveBeenCalledTimes(1);
      expect(writeErrorToFileSpy).toHaveBeenCalledWith(
        'Error: Age must be provided!'
      );
    });

    it('should return status 200 if user is in db with updated data', async () => {
      readFromFileSpy.mockReturnValue([USER_MOCK_DATA]);
      const responseMock = generateResponseMock();

      await userController.updateUser(
        generateRequestMock(
          {
            ...USER_MOCK_DATA,
            firstName: 'John',
            lastName: 'Doe',
            age: '24',
            subscriptions: JSON.stringify(['news']),
            avatar: 'test.png'
          },
          PARAMETERS
        ),
        responseMock,
        nextMock
      );

      const { password, ...rest } = USER_MOCK_DATA;
      expect(readFromFileSpy).toHaveBeenCalledTimes(2);
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.status().json).toHaveBeenCalledWith({
        data: {
          ...rest,
          isProfileUpdated: true,
          firstName: 'John',
          lastName: 'Doe',
          age: '24',
          userName: 'John Doe',
          subscriptions: ['news'],
          avatar: 'http://localhost:3000/static/user_id-test.png'
        },
        message: `User with id ${USER_MOCK_DATA.id} was successfully update`,
        status: 200
      });
    });

    it('should throw error and call writeErrorToFile and next function if exception happen', async () => {
      const error = new Error('Error occurred!');
      readFromFileSpy.mockImplementation(() => {
        throw error;
      });
      const responseMock = generateResponseMock();

      await userController.updateUser(
        generateRequestMock(USER_MOCK_DATA, PARAMETERS),
        responseMock,
        nextMock
      );

      expect(readFromFileSpy).toHaveBeenCalledTimes(1);
      expect(writeErrorToFileSpy).toHaveBeenCalledWith(
        'Error: Error occurred!'
      );
      expect(nextMock).toHaveBeenCalledWith(error);
    });
  });
});
