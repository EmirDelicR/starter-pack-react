import { NextFunction, Request, Response } from 'express';

import { IApiResponse } from 'src/interfaces/api';
import { IUpdateUserBodyRequest, IUser } from 'src/interfaces/user';

import { getUserByIdFromDb, patchUserInDb } from 'src/util/db';
import HttpError from 'src/util/errors/httpError';
import { writeErrorToFile } from 'src/util/file';
import { validateProperty } from 'src/util/validation';

const getUser = async (
  req: Request,
  res: Response<IApiResponse>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = getUserByIdFromDb(id);

    if (!user) {
      throw new HttpError({
        message: `User with ${id} was not found`,
        status: 404
      });
    }

    const { password: pass, ...rest } = user;

    res.status(200).json({
      data: rest,
      message: 'Fetch user successful',
      status: 200
    });
  } catch (error) {
    writeErrorToFile(`${error}`);
    next(error);
  }
};

const updateUser = async (
  req: Request<{ id: string }, unknown, IUpdateUserBodyRequest>,
  res: Response<IApiResponse>,
  next: NextFunction
) => {
  try {
    const userData = req.body;
    const { id } = req.params;
    const user = getUserByIdFromDb(id);

    if (!user) {
      throw new HttpError({
        message: `User with ${id} was not found`,
        status: 404
      });
    }

    validateProperty(userData.firstName, 'First name');
    validateProperty(userData.lastName, 'Last name');
    validateProperty(userData.age, 'Age');

    const PORT: number = parseInt(process.env.PORT!, 10) || 3000;
    const HOST: string = process.env.HOST! || 'localhost';

    const updatedUser: IUser = {
      ...user,
      ...userData,
      avatar: `http://${HOST}:${PORT}/static/${id}-${userData?.avatar}`,
      subscriptions: JSON.parse(userData?.subscriptions),
      isProfileUpdated: true,
      userName: `${userData.firstName} ${userData.lastName}`.trim()
    };

    patchUserInDb(updatedUser);
    const { password: pass, ...rest } = updatedUser;

    res.status(200).json({
      data: { ...rest },
      message: `User with id ${user.id} was successfully update`,
      status: 200
    });
  } catch (error) {
    writeErrorToFile(`${error}`);
    next(error);
  }
};

export const userController = {
  getUser,
  updateUser
};
