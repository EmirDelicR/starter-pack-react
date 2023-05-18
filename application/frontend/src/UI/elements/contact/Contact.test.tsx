import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { Contact } from './Contact';

const mockOpenModal = vi.fn();

vi.mock('@/UI/components/modal/useModal', () => ({
  useModal: () => ({
    Modal: () => <div>Modal</div>,
    openModal: mockOpenModal,
    closeModal: vi.fn()
  })
}));

describe('<Contact />', () => {
  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should render contact button', () => {
    render(<Contact />);

    expect(screen.getByText('Let‘s talk!')).toBeInTheDocument();
    expect(screen.getByText('Modal')).toBeInTheDocument();
  });

  it('should call openModal function on button click', () => {
    render(<Contact />);
    const button = screen.getByText('Let‘s talk!');

    fireEvent.click(button);

    expect(mockOpenModal).toBeCalledTimes(1);
  });
});
