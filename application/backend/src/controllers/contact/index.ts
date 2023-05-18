import { NextFunction, Request, Response } from 'express';

import { IApiResponse } from 'src/interfaces/api';
import {
  IEmailsPaginatedQueryRequest,
  IMessage,
  IMessageRequest
} from 'src/interfaces/message';

import { getAllEmailsFromDb } from 'src/util/db';
import { sendMail } from 'src/util/email';
import { writeErrorToFile } from 'src/util/file';
import { validateEmail, validateProperty } from 'src/util/validation';

const sendMessage = async (
  req: Request<unknown, unknown, IMessageRequest>,
  res: Response<IApiResponse>,
  next: NextFunction
) => {
  try {
    const { email, fullName, message } = req.body;

    validateEmail(email);
    validateProperty(fullName, 'Name');
    validateProperty(message, 'Message');

    await sendMail(email, fullName, message);

    res.status(200).json({
      data: {},
      message: 'Message send successful',
      status: 200
    });
  } catch (error) {
    writeErrorToFile(`${error}`);
    next(error);
  }
};

const getEmails = (
  _req: Request,
  res: Response<IApiResponse>,
  next: NextFunction
) => {
  try {
    const emails: IMessage[] = getAllEmailsFromDb();

    res.status(200).json({
      data: emails,
      message: 'Fetch emails successful',
      status: 200
    });
  } catch (error) {
    writeErrorToFile(`${error}`);
    next(error);
  }
};

const getPaginatedEmails = (
  req: Request<{}, unknown, unknown, IEmailsPaginatedQueryRequest>,
  res: Response<IApiResponse>,
  next: NextFunction
) => {
  try {
    const {
      columnId,
      page = 0,
      pageSize = 4,
      desc = 'false',
      filter = ''
    } = req.query;

    const emails: IMessage[] = getAllEmailsFromDb();

    if (emails.length === 0) {
      res.status(200).json({
        data: {
          numberOfPages: 0,
          items: []
        },
        message: 'Fetch emails successful',
        status: 200
      });
      return;
    }

    let data = [...emails];

    if (filter && filter.trim() !== '') {
      data = data.filter(
        ({ from, message }) => from.includes(filter) || message.includes(filter)
      );
    }

    if (columnId) {
      data = data.sort((a, b) => a[columnId].localeCompare(b[columnId]));

      if (desc === 'true') {
        data = data.reverse();
      }
    }

    const numberOfPages = Math.ceil(emails.length / pageSize);
    const paginatedData = data.slice(page * pageSize, pageSize * (+page + 1));

    res.status(200).json({
      data: {
        numberOfPages,
        items: paginatedData
      },
      message: 'Fetch emails successful',
      status: 200
    });
  } catch (error) {
    writeErrorToFile(`${error}`);
    next(error);
  }
};

export const contactController = {
  sendMessage,
  getEmails,
  getPaginatedEmails
};
