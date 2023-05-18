import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';

import { IApiResponse } from 'src/interfaces/api';
import {
  ITodo,
  ITodoAddBodyRequest,
  ITodoQueryRequest
} from 'src/interfaces/todo';

import {
  getAllTodoItemsFromDb,
  getItemIndex,
  getUserByIdFromDb,
  getUserTodoItemsFromDb
} from 'src/util/db';
import HttpError from 'src/util/errors/httpError';
import { writeErrorToFile, writeToDbFile } from 'src/util/file';
import { validateProperty } from 'src/util/validation';

const getItems = async (
  req: Request<{ userId: string }>,
  res: Response<IApiResponse>,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const userItems = getUserTodoItemsFromDb(userId);

    res.status(200).json({
      data: userItems,
      message: 'Fetch items successful',
      status: 200
    });
  } catch (error) {
    writeErrorToFile(`${error}`);
    next(error);
  }
};

const getPaginatedItems = async (
  req: Request<{ userId: string }, unknown, unknown, ITodoQueryRequest>,
  res: Response<IApiResponse>,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const { page = 0, pageSize = 4, isMobile = 'false' } = req.query;
    const userItems = getUserTodoItemsFromDb(userId);

    if (userItems.length === 0) {
      res.status(200).json({
        data: {
          numberOfPages: 0,
          items: []
        },
        message: 'Fetch items successful',
        status: 200
      });
      return;
    }

    const numberOfPages = Math.ceil(userItems.length / pageSize);
    let sliceStartPoint = page * pageSize;

    if (isMobile === 'true') {
      sliceStartPoint = 0;
    }

    const paginatedData = userItems.slice(
      sliceStartPoint,
      pageSize * (+page + 1)
    );

    res.status(200).json({
      data: {
        numberOfPages,
        items: paginatedData
      },
      message: 'Fetch items successful',
      status: 200
    });
  } catch (error) {
    writeErrorToFile(`${error}`);
    next(error);
  }
};

const addItem = async (
  req: Request<unknown, unknown, ITodoAddBodyRequest>,
  res: Response<IApiResponse>,
  next: NextFunction
) => {
  try {
    const { userId, title } = req.body;
    const user = getUserByIdFromDb(userId);

    if (!user) {
      throw new HttpError({
        message: `User with ${userId} was not found`,
        status: 404
      });
    }

    validateProperty(title, 'Title');
    const items = getAllTodoItemsFromDb();

    const item: ITodo = {
      userId,
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date()
    };
    items.push(item);

    writeToDbFile(items, 'todo.json');

    res.status(201).json({
      data: { ...item },
      message: 'Item was added successful',
      status: 201
    });
  } catch (error) {
    writeErrorToFile(`${error}`);
    next(error);
  }
};

const deleteItem = async (
  req: Request<{ id: string }, unknown, { userId: string }>,
  res: Response<IApiResponse>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const items = getAllTodoItemsFromDb();
    const itemToDeleteIndex = getItemIndex(items, id, userId);

    items.splice(itemToDeleteIndex, 1);
    writeToDbFile(items, 'todo.json');

    res.status(200).json({
      data: null,
      message: `Item with id ${id} was deleted successfully`,
      status: 200
    });
  } catch (error) {
    writeErrorToFile(`${error}`);
    next(error);
  }
};

const updateItem = async (
  req: Request<{ id: string }, unknown, { userId: string }>,
  res: Response<IApiResponse>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const items = getAllTodoItemsFromDb();
    const itemToUpdateIndex = getItemIndex(items, id, userId);

    items[itemToUpdateIndex] = {
      ...items[itemToUpdateIndex],
      completed: !items[itemToUpdateIndex].completed
    };
    writeToDbFile(items, 'todo.json');

    res.status(200).json({
      data: { ...items[itemToUpdateIndex] },
      message: `Item with id ${id} was updated successfully`,
      status: 200
    });
  } catch (error) {
    writeErrorToFile(`${error}`);
    next(error);
  }
};

export const todoController = {
  getItems,
  getPaginatedItems,
  addItem,
  deleteItem,
  updateItem
};
