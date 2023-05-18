import * as nodemailer from 'nodemailer';

import { sendMail } from 'src/util/email';
import { readFromFileSpy, writeToDbFileSpy } from 'src/util/mocks';

jest.mock('nodemailer');

const URL = 'http://test.com';
const EMAIL = 'john@doe.com';
const NAME = 'John Doe';
const MESSAGE = 'Test message';
const MESSAGE_ID = 'message-id';
const INFO = {
  messageId: MESSAGE_ID,
  envelope: {
    from: EMAIL
  }
};
const mockSendEmail = jest.fn();

jest.mock('src/util/logger/console', () => ({
  info: jest.fn()
}));

describe('Email utils', () => {
  const createTestAccountSpy = jest.spyOn(nodemailer, 'createTestAccount');
  const createTransportSpy = jest.spyOn(nodemailer, 'createTransport');
  const getTestMessageUrlSpy = jest.spyOn(nodemailer, 'getTestMessageUrl');

  beforeEach(() => {
    readFromFileSpy.mockReset();
    writeToDbFileSpy.mockReset();
    mockSendEmail.mockReset().mockResolvedValue(INFO);
    createTestAccountSpy.mockReset().mockResolvedValue({
      user: 'test@test.com',
      pass: 'password'
    } as any);
    createTransportSpy.mockReset().mockReturnValue({
      sendMail: mockSendEmail
    } as any);
    getTestMessageUrlSpy.mockReset().mockReturnValue(URL);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('sendMail', () => {
    it('should send email', async () => {
      readFromFileSpy.mockReturnValue([]);
      await sendMail(EMAIL, NAME, MESSAGE);

      expect(createTransportSpy).toBeCalledWith({
        auth: { pass: 'password', user: 'test@test.com' },
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false
      });

      expect(mockSendEmail).toBeCalledWith({
        from: `${NAME} <${EMAIL}>`,
        to: 'test@test.com',
        subject: 'Request from user.',
        text: MESSAGE
      });

      expect(getTestMessageUrlSpy).toBeCalledWith(INFO);
      expect(writeToDbFileSpy).toBeCalledWith(
        [
          {
            date: expect.any(String),
            from: EMAIL,
            id: MESSAGE_ID,
            message: MESSAGE,
            previewUrl: URL
          }
        ],
        'email.json'
      );
    });
  });
});
