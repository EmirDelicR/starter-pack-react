import { IMessage } from 'src/interfaces/message';
import { ITodo } from 'src/interfaces/todo';
import { IUser } from 'src/interfaces/user';

import HttpError from 'src/util/errors/httpError';
import { readFromFile, writeToDbFile } from 'src/util/file';

export const getUserTodoItemsFromDb = (userId: string) => {
  const items = readFromFile<ITodo>('dummy-db', 'todo.json') || [];
  return items.filter((item) => item.userId === userId);
};

export const getAllTodoItemsFromDb = () => {
  const items = readFromFile<ITodo>('dummy-db', 'todo.json') || [];
  return items;
};
/**
 * @description Find item index in array by id and user id, throw exception if index is not find
 * @param items - items array
 * @param id - item id
 * @param userId - user id
 * @returns number
 */
export const getItemIndex = (items: ITodo[], id: string, userId: string) => {
  const itemIndex = items.findIndex(
    (item) => item.id === id && item.userId === userId
  );

  if (itemIndex < 0) {
    throw new HttpError({
      message: `Item ${id} was not found`,
      status: 404
    });
  }

  return itemIndex;
};

export const getAllUsersFromDb = () => {
  const users = readFromFile<IUser>('dummy-db', 'user.json') || [];
  return users;
};

export const getUserByIdFromDb = (userId: string) => {
  const users = readFromFile<IUser>('dummy-db', 'user.json') || [];
  return users.find((u) => u.id === userId);
};

export const getUserByEmailFromDb = (email: string) => {
  const users = readFromFile<IUser>('dummy-db', 'user.json') || [];
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
};
/**
 * @description Update user data, throw exception if user is not find
 * @param user - user collection
 */
export const patchUserInDb = (user: IUser) => {
  const users = readFromFile<IUser>('dummy-db', 'user.json') || [];
  const userIndex = users.findIndex((u) => u.id === user.id);

  if (userIndex < 0) {
    throw new HttpError({
      message: `User with ${user.id} was not found`,
      status: 404
    });
  }

  users[userIndex] = {
    ...user
  };
  writeToDbFile(users, 'user.json');
};

export const getAllEmailsFromDb = () => {
  const emailList = readFromFile<IMessage>('dummy-db', 'email.json') || [];
  return emailList;
};
