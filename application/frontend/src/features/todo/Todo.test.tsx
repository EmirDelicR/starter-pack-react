import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { INITIAL_USER_DATA } from '@/store/userSlice';
import { renderWithProviders } from '@/utils/test/test-utils';

import Todo from './Todo';

const mockAddTodo = vi.fn();
const mockUpdateTodo = vi.fn();
const mockDeleteTodo = vi.fn();

const USER_ID = 'user-id';
const DEFAULT_TODO = {
  userId: 'user-id',
  id: '1',
  title: 'my-todo',
  completed: false
};
const DATA = {
  items: [DEFAULT_TODO],
  numberOfPages: 2
};
let mockGetPaginatedTodosData = {
  data: DATA,
  isLoading: false,
  isSuccess: true,
  isError: false,
  error: {}
};

vi.mock('@/features/todo/todoStore', async () => ({
  ...(await vi.importActual<Record<string, unknown>>(
    '@/features/todo/todoStore'
  )),
  useAddTodoMutation: () => [mockAddTodo],
  useUpdateTodoMutation: () => [mockUpdateTodo],
  useDeleteTodoMutation: () => [mockDeleteTodo],
  useGetPaginatedTodosQuery: () => mockGetPaginatedTodosData
}));

describe('<Todo/>', () => {
  const PRELOADED_STATE = {
    user: {
      data: {
        ...INITIAL_USER_DATA.data,
        id: USER_ID
      }
    }
  };

  Object.defineProperty(window, 'crypto', {
    value: { randomUUID: () => Math.random() }
  });

  beforeEach(() => {
    mockGetPaginatedTodosData = {
      data: DATA,
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: {}
    };
  });

  afterEach(() => {
    mockAddTodo.mockReset();
    mockUpdateTodo.mockReset();
    mockDeleteTodo.mockReset();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe('Layout test', () => {
    it('should render element', () => {
      renderWithProviders(<Todo />, { preloadedState: PRELOADED_STATE });

      expect(screen.getByText('Manage tasks')).toBeInTheDocument();
      expect(screen.getByText('Enter new todo')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter data')).toBeInTheDocument();
      expect(screen.getByText('Submit')).toBeInTheDocument();
      expect(screen.getByText('my-todo')).toBeInTheDocument();
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
      expect(screen.getByRole('delete-icon')).toBeInTheDocument();
    });

    it('should not render items and pagination if no elements', () => {
      mockGetPaginatedTodosData = {
        data: { items: [], numberOfPages: 0 },
        isLoading: false,
        isSuccess: true,
        isError: false,
        error: {}
      };

      renderWithProviders(<Todo />, { preloadedState: PRELOADED_STATE });

      expect(screen.queryByText('my-todo')).not.toBeInTheDocument();
      expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
      expect(screen.queryByRole('delete-icon')).not.toBeInTheDocument();
    });
  });

  describe('Create todo test', () => {
    it('should not call addTodo if there is no input data', async () => {
      renderWithProviders(<Todo />, { preloadedState: PRELOADED_STATE });

      await userEvent.click(screen.getByText('Submit'));

      expect(mockAddTodo).toBeCalledTimes(0);
    });

    it('should call addTodo if there is input data', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Todo />, { preloadedState: PRELOADED_STATE });

      await user.type(screen.getByPlaceholderText('Enter data'), 'abc');
      await user.click(screen.getByText('Submit'));

      expect(mockAddTodo).toBeCalledWith({ title: 'abc', userId: USER_ID });
    });
  });

  describe('Update/delete todo test', () => {
    it('should call update todo', async () => {
      renderWithProviders(<Todo />, { preloadedState: PRELOADED_STATE });

      await userEvent.click(screen.queryByRole('checkbox')!);

      expect(mockUpdateTodo).toBeCalledWith({
        completed: true,
        id: DEFAULT_TODO.id,
        title: DEFAULT_TODO.title,
        userId: USER_ID
      });
    });

    it('should call delete', async () => {
      renderWithProviders(<Todo />, { preloadedState: PRELOADED_STATE });

      await userEvent.click(screen.queryByRole('delete-icon')!);

      expect(mockDeleteTodo).toBeCalledWith({
        userId: USER_ID,
        todoId: DEFAULT_TODO.id
      });
    });
  });

  describe('Todo list test', () => {
    it('should not render content if isSuccess is false', () => {
      mockGetPaginatedTodosData = {
        ...mockGetPaginatedTodosData,
        isSuccess: false
      };
      renderWithProviders(<Todo />, { preloadedState: PRELOADED_STATE });

      expect(screen.queryByText('my-todo')).not.toBeInTheDocument();
      expect(
        screen.queryByText('Currently there is no data.')
      ).not.toBeInTheDocument();
    });

    it('should not render message if there is not items', () => {
      mockGetPaginatedTodosData = {
        ...mockGetPaginatedTodosData,
        data: {
          items: [],
          numberOfPages: 0
        }
      };
      renderWithProviders(<Todo />, { preloadedState: PRELOADED_STATE });

      expect(
        screen.getByText('Currently there is no data.')
      ).toBeInTheDocument();
    });

    it('should render loader if state is loading', () => {
      mockGetPaginatedTodosData = {
        ...mockGetPaginatedTodosData,
        isLoading: true
      };
      renderWithProviders(<Todo />, { preloadedState: PRELOADED_STATE });

      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should render error message if state is error', () => {
      mockGetPaginatedTodosData = {
        ...mockGetPaginatedTodosData,
        isError: true,
        error: {
          data: 'Error occurred'
        }
      };
      renderWithProviders(<Todo />, { preloadedState: PRELOADED_STATE });

      expect(screen.getByText('Error occurred.')).toBeInTheDocument();
    });
  });
});
