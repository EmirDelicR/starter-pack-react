import {
  getAllEmailsFromDb,
  getAllTodoItemsFromDb,
  getAllUsersFromDb,
  getItemIndex,
  getUserByEmailFromDb,
  getUserByIdFromDb,
  getUserTodoItemsFromDb,
  patchUserInDb
} from 'src/util/db';
import HttpError from 'src/util/errors/httpError';
import {
  EMAIL_MOCK_DATA,
  TODO_MOCK_DATA,
  USER_MOCK_DATA,
  readFromFileSpy,
  writeToDbFileSpy
} from 'src/util/mocks';

describe('DB utils', () => {
  beforeEach(() => {
    readFromFileSpy.mockReset();
  });

  describe('getUserTodoItemsFromDb', () => {
    it('should return empty array if no data', () => {
      readFromFileSpy.mockReturnValue([]);

      expect(getUserTodoItemsFromDb('test')).toEqual([]);
    });

    it('should return data for user id', () => {
      readFromFileSpy.mockReturnValue([TODO_MOCK_DATA]);

      expect(getUserTodoItemsFromDb(TODO_MOCK_DATA.userId)).toEqual([
        TODO_MOCK_DATA
      ]);
    });

    it('should return empty array if user do not have items', () => {
      readFromFileSpy.mockReturnValue([TODO_MOCK_DATA]);

      expect(getUserTodoItemsFromDb('test')).toEqual([]);
    });
  });

  describe('getAllTodoItemsFromDb', () => {
    it('should return empty array if no data', () => {
      readFromFileSpy.mockReturnValue([]);

      expect(getAllTodoItemsFromDb()).toEqual([]);
    });

    it('should return all data', () => {
      readFromFileSpy.mockReturnValue([TODO_MOCK_DATA]);

      expect(getAllTodoItemsFromDb()).toEqual([TODO_MOCK_DATA]);
    });
  });

  describe('getItemIndex', () => {
    it('should throw error if no index of the item', () => {
      readFromFileSpy.mockReturnValue([]);

      expect(() => getItemIndex([], 'item_id', 'user_id_test')).toThrow(
        HttpError
      );
      expect(() => {
        getItemIndex([TODO_MOCK_DATA], 'item_id', 'user_id_test');
      }).toThrow(HttpError);
      expect(() => {
        getItemIndex([TODO_MOCK_DATA], TODO_MOCK_DATA.id, 'user_id_test');
      }).toThrow(HttpError);
      expect(() => {
        getItemIndex([TODO_MOCK_DATA], 'item_id', TODO_MOCK_DATA.userId);
      }).toThrow(HttpError);
    });

    it('should return item index', () => {
      readFromFileSpy.mockReturnValue([TODO_MOCK_DATA]);

      expect(
        getItemIndex([TODO_MOCK_DATA], TODO_MOCK_DATA.id, TODO_MOCK_DATA.userId)
      ).toEqual(0);
    });
  });

  describe('getAllUsersFromDb', () => {
    it('should return empty array if no data', () => {
      readFromFileSpy.mockReturnValue([]);

      expect(getAllUsersFromDb()).toEqual([]);
    });

    it('should return data for user id', () => {
      readFromFileSpy.mockReturnValue([USER_MOCK_DATA]);

      expect(getAllUsersFromDb()).toEqual([USER_MOCK_DATA]);
    });
  });

  describe('getUserByIdFromDb', () => {
    it('should return undefined if no data', () => {
      readFromFileSpy.mockReturnValue([]);

      expect(getUserByIdFromDb('test')).toEqual(undefined);
    });

    it('should return data for user id', () => {
      readFromFileSpy.mockReturnValue([USER_MOCK_DATA]);

      expect(getUserByIdFromDb(USER_MOCK_DATA.id)).toEqual(USER_MOCK_DATA);
    });

    it('should return undefined if no user with user id in db', () => {
      readFromFileSpy.mockReturnValue([USER_MOCK_DATA]);

      expect(getUserByIdFromDb('test')).toEqual(undefined);
    });
  });

  describe('getUserByEmailFromDb', () => {
    it('should return undefined if no data', () => {
      readFromFileSpy.mockReturnValue([]);

      expect(getUserByEmailFromDb('test')).toEqual(undefined);
    });

    it('should return data for user id', () => {
      readFromFileSpy.mockReturnValue([USER_MOCK_DATA]);

      expect(getUserByEmailFromDb(USER_MOCK_DATA.email)).toEqual(
        USER_MOCK_DATA
      );
    });

    it('should return undefined if no user with user id in db', () => {
      readFromFileSpy.mockReturnValue([USER_MOCK_DATA]);

      expect(getUserByEmailFromDb('test')).toEqual(undefined);
    });
  });

  describe('patchUserInDb', () => {
    it('should throw error if no user index is find', () => {
      readFromFileSpy.mockReturnValue([]);

      expect(() => {
        patchUserInDb(USER_MOCK_DATA);
      }).toThrow(HttpError);
    });

    it('should update user in db', () => {
      readFromFileSpy.mockReturnValue([USER_MOCK_DATA]);

      patchUserInDb({ ...USER_MOCK_DATA, firstName: 'John' });
      expect(writeToDbFileSpy).toHaveBeenCalledWith(
        [{ ...USER_MOCK_DATA, firstName: 'John' }],
        'user.json'
      );
    });
  });

  describe('getAllEmailsFromDb', () => {
    it('should return empty array if no data', () => {
      readFromFileSpy.mockReturnValue([]);

      expect(getAllEmailsFromDb()).toEqual([]);
    });

    it('should return all data', () => {
      readFromFileSpy.mockReturnValue([EMAIL_MOCK_DATA]);

      expect(getAllTodoItemsFromDb()).toEqual([EMAIL_MOCK_DATA]);
    });
  });
});
