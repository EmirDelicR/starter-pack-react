import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import ContactForm from './ContactForm';

const mockSendMessage = vi.fn();

let mockUseSendMessageMutationData = {
  isLoading: false,
  isSuccess: true,
  isError: false,
  error: {}
};

vi.mock('@/features/contactForm/contactFormStore', async () => ({
  ...(await vi.importActual<Record<string, unknown>>(
    '@/features/contactForm/contactFormStore'
  )),
  useSendMessageMutation: () => [
    mockSendMessage,
    mockUseSendMessageMutationData
  ]
}));

describe('<ContactForm/>', () => {
  const mockOnSubmitCallback = vi.fn();

  Object.defineProperty(window, 'crypto', {
    value: { randomUUID: () => Math.random() }
  });

  beforeEach(() => {
    mockUseSendMessageMutationData = {
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: {}
    };
  });

  afterEach(() => {
    mockSendMessage.mockReset();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe('Layout test', () => {
    it('should render element', () => {
      render(<ContactForm onSubmitCallback={mockOnSubmitCallback} />);

      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Full Name')).toBeInTheDocument();
      expect(screen.getByRole('textarea')).toBeInTheDocument();
      expect(screen.getByText('Send message')).toBeInTheDocument();
    });

    it('should render loader if is loading state', () => {
      mockUseSendMessageMutationData = {
        ...mockUseSendMessageMutationData,
        isLoading: true
      };
      render(<ContactForm onSubmitCallback={mockOnSubmitCallback} />);

      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should render error if is error state', () => {
      mockUseSendMessageMutationData = {
        ...mockUseSendMessageMutationData,
        isError: true,
        error: {
          data: 'Error occurred'
        }
      };
      render(<ContactForm onSubmitCallback={mockOnSubmitCallback} />);

      expect(screen.getByText('Error occurred.')).toBeInTheDocument();
    });
  });

  describe('Handling submit test', () => {
    it('should not send message if no input data', async () => {
      render(<ContactForm onSubmitCallback={mockOnSubmitCallback} />);

      const button = screen.getByText('Send message');
      await userEvent.click(button);

      expect(mockSendMessage).not.toBeCalled();
    });

    it('should not send message if email is not set because button is disabled', async () => {
      const user = userEvent.setup();
      render(<ContactForm onSubmitCallback={mockOnSubmitCallback} />);

      const inputs = screen.getAllByPlaceholderText('Enter data');
      await user.type(inputs[0], 'test@test.com');

      const button = screen.getByText('Send message');
      expect(button).toHaveAttribute('disabled');
    });

    it('should not send message if fullName is not set', async () => {
      const user = userEvent.setup();
      render(<ContactForm onSubmitCallback={mockOnSubmitCallback} />);

      const inputs = screen.getAllByPlaceholderText('Enter data');
      await user.type(inputs[1], 'John Doe');

      const button = screen.getByText('Send message');
      await user.click(button);

      expect(mockSendMessage).not.toBeCalled();
    });

    it('should send message if fullName amd email is set', async () => {
      const user = userEvent.setup();
      render(<ContactForm onSubmitCallback={mockOnSubmitCallback} />);

      const inputs = screen.getAllByPlaceholderText('Enter data');
      const message = screen.getByRole('textarea');

      await user.type(inputs[0], 'test@test.com');
      await user.type(inputs[1], 'John Doe');
      await user.type(message, 'Message...');

      const button = screen.getByText('Send message');
      await user.click(button);

      expect(mockSendMessage).toBeCalledWith({
        email: 'test@test.com',
        fullName: 'John Doe',
        message: 'Message...'
      });
      expect(mockOnSubmitCallback).toBeCalledTimes(1);
    });
  });
});
