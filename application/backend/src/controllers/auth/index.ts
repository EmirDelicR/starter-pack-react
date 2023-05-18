import { hash, verify } from 'argon2';
import crypto from 'crypto';
import { CookieOptions, NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { IApiResponse, IApiResponseWithToken } from 'src/interfaces/api';
import {
  IAuthUserBodyRequest,
  IJwtTokenData,
  IUser
} from 'src/interfaces/user';

import {
  getAllUsersFromDb,
  getUserByEmailFromDb,
  patchUserInDb
} from 'src/util/db';
import HttpError from 'src/util/errors/httpError';
import { writeErrorToFile, writeToDbFile } from 'src/util/file';
import {
  validateEmail,
  validatePassword,
  validateProperty
} from 'src/util/validation';

export const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  sameSite: 'none',
  secure: true,
  maxAge: 24 * 60 * 60 * 1000
};

const INITIAL_USER_DATA: IUser = {
  age: '',
  avatar: '',
  email: '',
  firstName: '',
  id: '',
  isLoggedIn: false,
  isProfileUpdated: false,
  isSubscribed: false,
  lastName: '',
  subscriptions: [],
  password: '',
  token: null,
  userName: ''
};

const loginUser = async (
  email: string,
  password: string
): Promise<IApiResponseWithToken> => {
  const {
    AUTH_PASSWORD_SALT,
    AUTH_JWT_SECRET,
    AUTH_JWT_EXPIRES,
    AUTH_JWT_REFRESH_EXPIRES,
    AUTH_JWT_REFRESH_SECRET
  } = process.env;
  const salt = Buffer.from(`${AUTH_PASSWORD_SALT}`, 'utf-8');

  validateEmail(email);
  validateProperty(password, 'Password');

  const user = getUserByEmailFromDb(email);

  if (!user) {
    throw new HttpError({ message: 'No user found in DB!', status: 404 });
  }

  const isPasswordMatch = await verify(user.password, password, { salt });
  if (!isPasswordMatch) {
    throw new HttpError({ message: 'Invalid password!', status: 400 });
  }

  const token = jwt.sign({ email, password }, `${AUTH_JWT_SECRET}`, {
    expiresIn: AUTH_JWT_EXPIRES
  });

  const refreshToken = jwt.sign(
    { email, password },
    `${AUTH_JWT_REFRESH_SECRET}`,
    {
      expiresIn: AUTH_JWT_REFRESH_EXPIRES
    }
  );

  user.token = token;
  user.isLoggedIn = true;
  patchUserInDb(user);
  const { password: pass, ...rest } = user;

  return {
    data: { ...rest },
    message: 'User is sign in successfully',
    status: 200,
    refreshToken
  };
};

const signIn = async (
  req: Request<unknown, unknown, IAuthUserBodyRequest>,
  res: Response<IApiResponse>,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const { refreshToken, ...response } = await loginUser(email, password);

    res.cookie('jwt', refreshToken, COOKIE_OPTIONS);
    res.status(200).json(response);
  } catch (error) {
    writeErrorToFile(`${error}`);
    next(error);
  }
};

const autoSignIn = async (
  req: Request<unknown, unknown, { token: string }>,
  res: Response<IApiResponse>,
  next: NextFunction
) => {
  const { AUTH_JWT_SECRET } = process.env;

  try {
    const { token } = req.body;
    const { email, password, exp } = jwt.verify(
      token,
      `${AUTH_JWT_SECRET}`
    ) as IJwtTokenData;

    if (Date.now() >= exp * 1000) {
      throw new HttpError({
        message: 'Token expired, please login again',
        status: 403
      });
    }

    const { refreshToken, ...response } = await loginUser(email, password);

    res.cookie('jwt', refreshToken, COOKIE_OPTIONS);
    res.status(200).json(response);
  } catch (error) {
    writeErrorToFile(`${error}`);
    next(error);
  }
};

const signUp = async (
  req: Request<unknown, unknown, IAuthUserBodyRequest>,
  res: Response<IApiResponse>,
  next: NextFunction
) => {
  const {
    AUTH_PASSWORD_SALT,
    AUTH_JWT_SECRET,
    AUTH_JWT_EXPIRES,
    AUTH_JWT_REFRESH_SECRET,
    AUTH_JWT_REFRESH_EXPIRES
  } = process.env;

  try {
    const { email, password } = req.body;

    validateEmail(email);
    validatePassword(password);

    const user = getUserByEmailFromDb(email);

    if (user) {
      throw new HttpError({
        message: 'User already exist. Please login!',
        status: 409
      });
    }
    // Encrypt user password
    const salt = Buffer.from(`${AUTH_PASSWORD_SALT}`, 'utf-8');
    const hashedPassword = await hash(password, { salt });

    const newUser: IUser = {
      ...INITIAL_USER_DATA,
      isLoggedIn: true,
      email,
      password: hashedPassword,
      id: crypto.randomUUID()
    };
    // Create token
    const token = jwt.sign({ email, password }, `${AUTH_JWT_SECRET}`, {
      expiresIn: AUTH_JWT_EXPIRES
    });
    // save user token
    newUser.token = token;
    writeToDbFile([...getAllUsersFromDb(), newUser], 'user.json');
    const { password: pass, ...rest } = newUser;

    const refreshToken = jwt.sign(
      { email, password },
      `${AUTH_JWT_REFRESH_SECRET}`,
      {
        expiresIn: AUTH_JWT_REFRESH_EXPIRES
      }
    );

    res.cookie('jwt', refreshToken, COOKIE_OPTIONS);
    res.status(201).json({
      data: { ...rest },
      message: 'User is sign up successfully',
      status: 201
    });
  } catch (error) {
    writeErrorToFile(`${error}`);
    next(error);
  }
};

const updateToken = async (req: Request, res: Response, next: NextFunction) => {
  const {
    AUTH_JWT_SECRET,
    AUTH_JWT_EXPIRES,
    AUTH_JWT_REFRESH_SECRET,
    AUTH_JWT_REFRESH_EXPIRES
  } = process.env;

  try {
    const { cookies } = req;

    if (!cookies?.jwt) {
      throw new HttpError({
        message: 'Token is not set in cookies',
        status: 403
      });
    }

    const { email, password, exp } = jwt.verify(
      cookies.jwt,
      `${AUTH_JWT_REFRESH_SECRET}`
    ) as IJwtTokenData;

    const user = getUserByEmailFromDb(email);

    if (!user) {
      throw new HttpError({ message: 'No user found in DB!', status: 404 });
    }

    if (user.email !== email) {
      throw new HttpError({
        message: 'Authorization forbidden',
        status: 403
      });
    }

    if (Date.now() >= exp * 1000) {
      throw new HttpError({
        message: 'Token expired, please login again',
        status: 403
      });
    }

    const token = jwt.sign({ email, password }, `${AUTH_JWT_SECRET}`, {
      expiresIn: AUTH_JWT_EXPIRES
    });

    user.token = token;
    user.isLoggedIn = true;
    patchUserInDb(user);
    const { password: pass, ...rest } = user;

    const refreshToken = jwt.sign(
      { email, password },
      `${AUTH_JWT_REFRESH_SECRET}`,
      {
        expiresIn: AUTH_JWT_REFRESH_EXPIRES
      }
    );

    res.cookie('jwt', refreshToken, COOKIE_OPTIONS);
    res.status(201).json({
      data: { ...rest },
      message: 'User token is updated successfully',
      status: 201
    });
  } catch (error) {
    writeErrorToFile(`${error}`);
    next(error);
  }
};

export const authController = {
  signIn,
  signUp,
  updateToken,
  autoSignIn
};
