import { contactController } from 'src/controllers/contact';

import * as emailUtils from 'src/util/email';
import {
  generateRequestMock,
  generateResponseMock,
  nextMock,
  writeErrorToFileSpy
} from 'src/util/mocks';

describe('Contact controller', () => {
  const sendEmailSpy = jest.spyOn(emailUtils, 'sendMail');

  beforeEach(() => {
    writeErrorToFileSpy.mockReset();
    sendEmailSpy.mockReset();
  });

  describe('sendMessage function', () => {
    it('should return status 400 if no email field', async () => {
      const responseMock = generateResponseMock();

      await contactController.sendMessage(
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

      await contactController.sendMessage(
        generateRequestMock({ email: 't' }),
        responseMock,
        nextMock
      );

      expect(writeErrorToFileSpy).toBeCalledWith(
        'Error: Email address must be valid!'
      );
    });

    it('should return status 400 if no name field', async () => {
      const responseMock = generateResponseMock();

      await contactController.sendMessage(
        generateRequestMock({ email: 't@t.com' }),
        responseMock,
        nextMock
      );

      expect(writeErrorToFileSpy).toBeCalledWith(
        'Error: Name must be provided!'
      );
    });

    it('should return status 400 if no message field', async () => {
      const responseMock = generateResponseMock();

      await contactController.sendMessage(
        generateRequestMock({ email: 't@t.com', fullName: 'name' }),
        responseMock,
        nextMock
      );

      expect(writeErrorToFileSpy).toBeCalledWith(
        'Error: Message must be provided!'
      );
    });

    it('should return status 200 if message is send', async () => {
      const responseMock = generateResponseMock();

      await contactController.sendMessage(
        generateRequestMock({
          email: 't@t.com',
          fullName: 'name',
          message: 'test'
        }),
        responseMock,
        nextMock
      );

      expect(sendEmailSpy).toBeCalledWith('t@t.com', 'name', 'test');
      expect(responseMock.status).toBeCalledWith(200);
      expect(responseMock.status().json).toBeCalledWith({
        data: {},
        message: 'Message send successful',
        status: 200
      });
    });
  });
});
