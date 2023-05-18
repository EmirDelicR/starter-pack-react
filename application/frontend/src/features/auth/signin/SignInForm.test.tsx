import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { renderWithProviders } from '@/utils/test/test-utils';

import SignInForm from './SignInForm';

const mockLogin = vi.fn();
const mockOnEmailChange = vi.fn();
const mockOnPasswordChange = vi.fn();
const mockHandleFormSubmit = vi.fn();

let mockUseLoginMutationData = {
  isLoading: false,
  isError: false,
  data: {},
  error: {}
};

let mockUseAuthData = {
  email: '',
  password: '',
  isButtonDisabled: true
};

vi.mock('@/features/auth/authStore/authApiSlice', async () => ({
  ...(await vi.importActual<Record<string, unknown>>(
    '@/features/auth/authStore/authApiSlice'
  )),
  useLoginMutation: () => [mockLogin, mockUseLoginMutationData]
}));

vi.mock('@/features/auth/useAuth', async () => ({
  ...(await vi.importActual<Record<string, unknown>>(
    '@/features/auth/useAuth'
  )),
  default: () => ({
    onEmailChange: mockOnEmailChange,
    onPasswordChange: mockOnPasswordChange,
    handleFormSubmit: mockHandleFormSubmit,
    ...mockUseAuthData
  })
}));

describe('<SignInForm/>', () => {
  Object.defineProperty(window, 'crypto', {
    value: { randomUUID: () => Math.random() }
  });

  beforeEach(() => {
    mockUseLoginMutationData = {
      isLoading: false,
      isError: false,
      data: {},
      error: {}
    };
    mockUseAuthData = {
      email: 'Sparta',
      password: '',
      isButtonDisabled: true
    };
  });

  afterEach(() => {
    mockLogin.mockReset();
    mockOnEmailChange.mockReset();
    mockOnPasswordChange.mockReset();
    mockHandleFormSubmit.mockReset();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe('Layout test', () => {
    it('should render element', () => {
      renderWithProviders(<SignInForm />);

      expect(screen.getAllByText('Login').length).toBe(2);
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Password')).toBeInTheDocument();
    });

    it('should render loader if is loading state', () => {
      mockUseLoginMutationData = {
        ...mockUseLoginMutationData,
        isLoading: true
      };
      renderWithProviders(<SignInForm />);

      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should render error if is error state', () => {
      mockUseLoginMutationData = {
        ...mockUseLoginMutationData,
        isError: true,
        error: {
          data: 'Error occurred'
        }
      };
      renderWithProviders(<SignInForm />);

      expect(screen.getByText('Error occurred.')).toBeInTheDocument();
    });
  });

  describe('Handling submit test', () => {
    it('should not submit if button is disabled', async () => {
      renderWithProviders(<SignInForm />);

      await userEvent.click(screen.getByRole('button'));

      expect(mockHandleFormSubmit).not.toBeCalled();
    });

    it('should submit if button is not disabled', async () => {
      mockUseAuthData.isButtonDisabled = false;
      renderWithProviders(<SignInForm />);

      await userEvent.click(screen.getByRole('button'));

      expect(mockHandleFormSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
