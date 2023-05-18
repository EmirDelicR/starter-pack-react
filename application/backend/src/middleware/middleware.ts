import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { origins } from 'src/config/corsOptions';

import { IApiResponse } from 'src/interfaces/api';

import { writeErrorToFile } from 'src/util/file';

const credentials = (req: Request, res: Response, next: NextFunction) => {
  const { origin } = req.headers;
  if (origin && origins.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  next();
};

const error: ErrorRequestHandler = (
  err,
  _req: Request,
  res: Response<IApiResponse>,
  next: NextFunction
) => {
  // TODO @ed use sentry to log errors;
  if (res.headersSent) {
    return next(err);
  }

  const { status = 500, data = null, message } = err;
  writeErrorToFile(message);

  return res.status(status).json({
    data,
    message,
    status
  });
};

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  const response: IApiResponse = {
    data: null,
    message: 'There is no authorization Header',
    status: 401
  };

  if (!authHeader) {
    return res.status(401).json(response);
  }

  if (typeof authHeader !== 'string') {
    return res.status(401).json(response);
  }

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json(response);
  }

  const { AUTH_JWT_SECRET } = process.env;
  const token = authHeader.split(' ')[1];

  return jwt.verify(token, `${AUTH_JWT_SECRET}`, (err) => {
    if (err) {
      response.message = 'Invalid or expired user token';
      return res.status(403).json(response);
    }
    return next();
  });
};

export const middleware = {
  credentials,
  error,
  verifyJWT
};
