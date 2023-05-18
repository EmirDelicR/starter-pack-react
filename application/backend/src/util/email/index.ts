import nodemailer from 'nodemailer';

import { getAllEmailsFromDb } from 'src/util/db';
import { writeToDbFile } from 'src/util/file';
import Console from 'src/util/logger/console';

export const sendMail = async (
  email: string,
  fullName: string,
  message: string
) => {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });

  const info = await transporter.sendMail({
    from: `${fullName} <${email}>`,
    to: 'test@test.com',
    subject: 'Request from user.',
    text: `${message}`
  });

  const previewUrl = nodemailer.getTestMessageUrl(info);
  Console.info(`Preview URL: ${previewUrl}`);

  const emailInDb = getAllEmailsFromDb();
  emailInDb.push({
    id: info.messageId,
    date: new Date().toLocaleString(),
    from: info.envelope.from as string,
    previewUrl: previewUrl as string,
    message
  });

  writeToDbFile(emailInDb, 'email.json');
};
