import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { renderWithProviders } from '@/utils/test/test-utils';

import SignUpForm from './SignUpForm';

const mockRegister = vi.fn();
const mockOnEmailChange = vi.fn();
const mockOnPasswordChange = vi.fn();
const mockHandleFormSubmit = vi.fn();

let mockUseRegisterMutationData = {
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
  useRegisterMutation: () => [mockRegister, mockUseRegisterMutationData]
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

describe('<SignUpForm/>', () => {
  Object.defineProperty(window, 'crypto', {
    value: { randomUUID: () => Math.random() }
  });

  beforeEach(() => {
    mockUseRegisterMutationData = {
      isLoading: false,
      isError: false,
      data: {},
      error: {}
    };
    mockUseAuthData = {
      email: '',
      password: '',
      isButtonDisabled: true
    };
  });

  afterEach(() => {
    mockRegister.mockReset();
    mockOnEmailChange.mockReset();
    mockOnPasswordChange.mockReset();
    mockHandleFormSubmit.mockReset();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe('Layout test', () => {
    it('should render element', () => {
      renderWithProviders(<SignUpForm />);

      expect(screen.getByText('Create account')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Password')).toBeInTheDocument();
      expect(screen.getByText('Create')).toBeInTheDocument();
    });

    it('should render loader if is loading state', () => {
      mockUseRegisterMutationData = {
        ...mockUseRegisterMutationData,
        isLoading: true
      };
      renderWithProviders(<SignUpForm />);

      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should render error if is error state', () => {
      mockUseRegisterMutationData = {
        ...mockUseRegisterMutationData,
        isError: true,
        error: {
          data: 'Error occurred'
        }
      };
      renderWithProviders(<SignUpForm />);

      expect(screen.getByText('Error occurred.')).toBeInTheDocument();
    });
  });

  describe('Handling submit test', () => {
    it('should not submit if button is disabled', async () => {
      renderWithProviders(<SignUpForm />);

      const button = screen.getByRole('button')!;
      await userEvent.click(button);

      expect(mockHandleFormSubmit).not.toBeCalled();
    });

    it('should submit if button is not disabled', async () => {
      mockUseAuthData = {
        ...mockUseAuthData,
        isButtonDisabled: false
      };
      renderWithProviders(<SignUpForm />);
      const button = screen.getByRole('button');
      await userEvent.click(button);

      expect(mockHandleFormSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
