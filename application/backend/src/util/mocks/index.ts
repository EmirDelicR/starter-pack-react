import { IMessage } from 'src/interfaces/message';
import { ITodo } from 'src/interfaces/todo';
import { IUser } from 'src/interfaces/user';

import * as fileUtils from 'src/util/file';

export const generateResponseMock = (): any => ({
  status: jest.fn().mockReturnValue({
    json: jest.fn()
  }),
  cookie: jest.fn()
});

export const generateRequestMock = <T>(
  body: T,
  params: { [key: string]: string } = {},
  query: { [key: string]: string | number | boolean } = {}
): any => ({ body, params, query });

export const nextMock = jest.fn();

export const readFromFileSpy = jest.spyOn(fileUtils, 'readFromFile');
export const writeErrorToFileSpy = jest.spyOn(fileUtils, 'writeErrorToFile');
export const writeToDbFileSpy = jest
  .spyOn(fileUtils, 'writeToDbFile')
  .mockImplementation(jest.fn());

export const USER_MOCK_DATA: IUser = {
  age: '',
  avatar: '',
  email: 'test@test.com',
  firstName: '',
  id: 'user_id',
  isLoggedIn: false,
  isProfileUpdated: false,
  isSubscribed: false,
  lastName: '',
  subscriptions: [],
  password: 'test-password',
  token: null,
  userName: ''
};

export const TODO_MOCK_DATA: ITodo = {
  completed: false,
  createdAt: new Date(),
  id: 'todo_id',
  title: 'My todo',
  userId: USER_MOCK_DATA.id
};

export const EMAIL_MOCK_DATA: IMessage = {
  id: 'email_id',
  date: new Date().toLocaleString(),
  from: 'test@test.com',
  message: 'test message',
  previewUrl: 'http://test.com'
};
