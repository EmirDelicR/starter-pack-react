import { todoController } from 'src/controllers/todo';

import {
  TODO_MOCK_DATA,
  USER_MOCK_DATA,
  generateRequestMock,
  generateResponseMock,
  nextMock,
  readFromFileSpy,
  writeErrorToFileSpy
} from 'src/util/mocks';

describe('Todo controller', () => {
  beforeEach(() => {
    readFromFileSpy.mockReset();
    writeErrorToFileSpy.mockReset();
    nextMock.mockReset();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('getItems function', () => {
    it('should return status 200 if todo list is empty', async () => {
      readFromFileSpy.mockReturnValue([]);
      const responseMock = generateResponseMock();

      await todoController.getItems(
        generateRequestMock({}, { userId: USER_MOCK_DATA.id }),
        responseMock,
        nextMock
      );

      expect(readFromFileSpy).toHaveBeenCalledTimes(1);
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.status().json).toHaveBeenCalledWith({
        data: [],
        message: 'Fetch items successful',
        status: 200
      });
    });

    it('should return status 200 with user items', async () => {
      readFromFileSpy.mockReturnValue([TODO_MOCK_DATA]);
      const responseMock = generateResponseMock();

      await todoController.getItems(
        generateRequestMock({}, { userId: USER_MOCK_DATA.id }),
        responseMock,
        nextMock
      );

      expect(readFromFileSpy).toHaveBeenCalledTimes(1);
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.status().json).toHaveBeenCalledWith({
        data: [TODO_MOCK_DATA],
        message: 'Fetch items successful',
        status: 200
      });
    });

    it('should return status 200 with empty list if items are not from user', async () => {
      readFromFileSpy.mockReturnValue([TODO_MOCK_DATA]);
      const responseMock = generateResponseMock();

      await todoController.getItems(
        generateRequestMock({}, { userId: 'test_id' }),
        responseMock,
        nextMock
      );

      expect(readFromFileSpy).toHaveBeenCalledTimes(1);
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.status().json).toHaveBeenCalledWith({
        data: [],
        message: 'Fetch items successful',
        status: 200
      });
    });

    it('should throw error and call writeErrorToFile and next function if exception happen', async () => {
      const error = new Error('Error occurred!');
      readFromFileSpy.mockImplementation(() => {
        throw error;
      });
      const responseMock = generateResponseMock();

      await todoController.getItems(
        generateRequestMock({}, { userId: 'test' }),
        responseMock,
        nextMock
      );

      expect(readFromFileSpy).toHaveBeenCalledTimes(1);
      expect(writeErrorToFileSpy).toHaveBeenCalledWith(
        'Error: Error occurred!'
      );
      expect(nextMock).toHaveBeenCalledWith(error);
    });
  });

  describe('getPaginatedItems function', () => {
    it('should return status 200 if todo list is empty', async () => {
      readFromFileSpy.mockReturnValue([]);
      const responseMock = generateResponseMock();

      await todoController.getPaginatedItems(
        generateRequestMock({}, { userId: USER_MOCK_DATA.id }),
        responseMock,
        nextMock
      );

      expect(readFromFileSpy).toHaveBeenCalledTimes(1);
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.status().json).toHaveBeenCalledWith({
        data: {
          numberOfPages: 0,
          items: []
        },
        message: 'Fetch items successful',
        status: 200
      });
    });

    it('should return status 200 with user items', async () => {
      readFromFileSpy.mockReturnValue([TODO_MOCK_DATA]);
      const responseMock = generateResponseMock();

      await todoController.getPaginatedItems(
        generateRequestMock({}, { userId: USER_MOCK_DATA.id }),
        responseMock,
        nextMock
      );

      expect(readFromFileSpy).toHaveBeenCalledTimes(1);
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.status().json).toHaveBeenCalledWith({
        data: {
          numberOfPages: 1,
          items: [TODO_MOCK_DATA]
        },
        message: 'Fetch items successful',
        status: 200
      });
    });

    it('should return status 200 with user items for first page', async () => {
      readFromFileSpy.mockReturnValue([
        TODO_MOCK_DATA,
        TODO_MOCK_DATA,
        TODO_MOCK_DATA
      ]);
      const responseMock = generateResponseMock();

      await todoController.getPaginatedItems(
        generateRequestMock({}, { userId: USER_MOCK_DATA.id }, { pageSize: 2 }),
        responseMock,
        nextMock
      );

      expect(readFromFileSpy).toHaveBeenCalledTimes(1);
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.status().json).toHaveBeenCalledWith({
        data: {
          numberOfPages: 2,
          items: [TODO_MOCK_DATA, TODO_MOCK_DATA]
        },
        message: 'Fetch items successful',
        status: 200
      });
    });

    it('should return status 200 with user items for second page', async () => {
      readFromFileSpy.mockReturnValue([
        TODO_MOCK_DATA,
        TODO_MOCK_DATA,
        TODO_MOCK_DATA
      ]);
      const responseMock = generateResponseMock();

      await todoController.getPaginatedItems(
        generateRequestMock(
          {},
          {
            userId: USER_MOCK_DATA.id
          },
          { page: 1, pageSize: 2 }
        ),
        responseMock,
        nextMock
      );

      expect(readFromFileSpy).toHaveBeenCalledTimes(1);
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.status().json).toHaveBeenCalledWith({
        data: {
          numberOfPages: 2,
          items: [TODO_MOCK_DATA]
        },
        message: 'Fetch items successful',
        status: 200
      });
    });

    it('should return status 200 with with user items for first page if is mobile', async () => {
      readFromFileSpy.mockReturnValue([
        TODO_MOCK_DATA,
        TODO_MOCK_DATA,
        TODO_MOCK_DATA
      ]);
      const responseMock = generateResponseMock();

      await todoController.getPaginatedItems(
        generateRequestMock(
          {},
          {
            userId: USER_MOCK_DATA.id
          },
          {
            page: 0,
            pageSize: 2,
            isMobile: true
          }
        ),
        responseMock,
        nextMock
      );

      expect(readFromFileSpy).toHaveBeenCalledTimes(1);
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.status().json).toHaveBeenCalledWith({
        data: {
          numberOfPages: 2,
          items: [TODO_MOCK_DATA, TODO_MOCK_DATA]
        },
        message: 'Fetch items successful',
        status: 200
      });
    });

    it('should return status 200 with all user items if is mobile and page is bigger then 1', async () => {
      readFromFileSpy.mockReturnValue([
        TODO_MOCK_DATA,
        TODO_MOCK_DATA,
        TODO_MOCK_DATA
      ]);
      const responseMock = generateResponseMock();

      await todoController.getPaginatedItems(
        generateRequestMock(
          {},
          {
            userId: USER_MOCK_DATA.id
          },
          {
            page: 2,
            pageSize: 2,
            isMobile: 'true'
          }
        ),
        responseMock,
        nextMock
      );

      expect(readFromFileSpy).toHaveBeenCalledTimes(1);
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.status().json).toHaveBeenCalledWith({
        data: {
          numberOfPages: 2,
          items: [TODO_MOCK_DATA, TODO_MOCK_DATA, TODO_MOCK_DATA]
        },
        message: 'Fetch items successful',
        status: 200
      });
    });
  });

  describe('addItem function', () => {
    it('should return 404 error if no user in DB', async () => {
      readFromFileSpy.mockReturnValue([]);
      const responseMock = generateResponseMock();

      await todoController.addItem(
        generateRequestMock({
          userId: USER_MOCK_DATA.id,
          title: 'My todo (test)'
        }),
        responseMock,
        nextMock
      );

      expect(readFromFileSpy).toHaveBeenCalledTimes(1);
      expect(writeErrorToFileSpy).toHaveBeenCalledWith(
        `Error: User with ${USER_MOCK_DATA.id} was not found`
      );
    });

    it('should return status code 201 and create todo', async () => {
      readFromFileSpy.mockReturnValue([USER_MOCK_DATA]);
      const responseMock = generateResponseMock();

      await todoController.addItem(
        generateRequestMock({
          userId: USER_MOCK_DATA.id,
          title: 'My todo (test)'
        }),
        responseMock,
        nextMock
      );

      expect(readFromFileSpy).toHaveBeenCalledTimes(2);
      expect(responseMock.status).toHaveBeenCalledWith(201);
      expect(responseMock.status().json).toHaveBeenCalledWith({
        data: {
          userId: USER_MOCK_DATA.id,
          id: expect.any(String),
          title: 'My todo (test)',
          completed: false,
          createdAt: expect.any(Date)
        },
        message: 'Item was added successful',
        status: 201
      });
    });

    it('should throw error and call writeErrorToFile and next function if exception happen', async () => {
      const error = new Error('Error occurred!');
      readFromFileSpy.mockImplementation(() => {
        throw error;
      });
      const responseMock = generateResponseMock();

      await todoController.addItem(
        generateRequestMock({}),
        responseMock,
        nextMock
      );

      expect(readFromFileSpy).toHaveBeenCalledTimes(1);
      expect(writeErrorToFileSpy).toHaveBeenCalledWith(
        'Error: Error occurred!'
      );
      expect(nextMock).toHaveBeenCalledWith(error);
    });
  });

  describe('deleteItem function', () => {
    it('should return status 404 and throw error if item is not founded', async () => {
      readFromFileSpy.mockReturnValue([]);
      const responseMock = generateResponseMock();

      await todoController.deleteItem(
        generateRequestMock(
          {
            userId: USER_MOCK_DATA.id
          },
          {
            id: 'some_id'
          }
        ),
        responseMock,
        nextMock
      );

      expect(writeErrorToFileSpy).toHaveBeenCalledWith(
        'Error: Item some_id was not found'
      );
    });

    it('should return status 404 and throw error if item is not founded', async () => {
      readFromFileSpy.mockReturnValue([]);
      const responseMock = generateResponseMock();

      await todoController.deleteItem(
        generateRequestMock(
          {
            userId: 'some_user_id'
          },
          {
            id: TODO_MOCK_DATA.id
          }
        ),
        responseMock,
        nextMock
      );

      expect(writeErrorToFileSpy).toHaveBeenCalledWith(
        `Error: Item ${TODO_MOCK_DATA.id} was not found`
      );
    });

    it('should return status 200 and delete item', async () => {
      readFromFileSpy.mockReturnValue([TODO_MOCK_DATA]);
      const responseMock = generateResponseMock();

      await todoController.deleteItem(
        generateRequestMock(
          {
            userId: USER_MOCK_DATA.id
          },
          {
            id: TODO_MOCK_DATA.id
          }
        ),
        responseMock,
        nextMock
      );

      expect(readFromFileSpy).toHaveBeenCalledTimes(1);
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.status().json).toHaveBeenCalledWith({
        data: null,
        message: `Item with id ${TODO_MOCK_DATA.id} was deleted successfully`,
        status: 200
      });
    });

    it('should throw error and call writeErrorToFile and next function if exception happen', async () => {
      const error = new Error('Error occurred!');
      readFromFileSpy.mockImplementation(() => {
        throw error;
      });
      const responseMock = generateResponseMock();

      await todoController.deleteItem(
        generateRequestMock(
          { userId: USER_MOCK_DATA.id },
          { id: TODO_MOCK_DATA.id }
        ),
        responseMock,
        nextMock
      );

      expect(readFromFileSpy).toHaveBeenCalledTimes(1);
      expect(writeErrorToFileSpy).toHaveBeenCalledWith(
        'Error: Error occurred!'
      );
      expect(nextMock).toHaveBeenCalledWith(error);
    });
  });

  describe('updateItem function', () => {
    it('should return status 404 and throw error if item is not founded', async () => {
      readFromFileSpy.mockReturnValue([]);
      const responseMock = generateResponseMock();

      await todoController.updateItem(
        generateRequestMock(
          {
            userId: USER_MOCK_DATA.id
          },
          {
            id: TODO_MOCK_DATA.id
          }
        ),
        responseMock,
        nextMock
      );

      expect(writeErrorToFileSpy).toHaveBeenCalledWith(
        `Error: Item ${TODO_MOCK_DATA.id} was not found`
      );
    });

    it('should return status 200 and delete item', async () => {
      readFromFileSpy.mockReturnValue([TODO_MOCK_DATA]);
      const responseMock = generateResponseMock();

      await todoController.updateItem(
        generateRequestMock(
          {
            userId: USER_MOCK_DATA.id
          },
          {
            id: TODO_MOCK_DATA.id
          }
        ),
        responseMock,
        nextMock
      );

      expect(readFromFileSpy).toHaveBeenCalledTimes(1);
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.status().json).toHaveBeenCalledWith({
        data: { ...TODO_MOCK_DATA, completed: !TODO_MOCK_DATA.completed },
        message: `Item with id ${TODO_MOCK_DATA.id} was updated successfully`,
        status: 200
      });
    });

    it('should throw error and call writeErrorToFile and next function if exception happen', async () => {
      const error = new Error('Error occurred!');
      readFromFileSpy.mockImplementation(() => {
        throw error;
      });
      const responseMock = generateResponseMock();

      await todoController.updateItem(
        generateRequestMock(
          {
            userId: USER_MOCK_DATA.id
          },
          {
            id: TODO_MOCK_DATA.id
          }
        ),
        responseMock,
        nextMock
      );

      expect(readFromFileSpy).toHaveBeenCalledTimes(1);
      expect(writeErrorToFileSpy).toHaveBeenCalledWith(
        'Error: Error occurred!'
      );
      expect(nextMock).toHaveBeenCalledWith(error);
    });
  });
});
