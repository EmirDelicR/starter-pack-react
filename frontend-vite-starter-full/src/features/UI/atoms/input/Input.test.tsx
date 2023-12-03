import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { screen, vi } from 'vitest';

import { Input } from './Input';

describe.skip('<Input/>', () => {
  const onChangeHandler = vi.fn();

  it('should render Input', () => {
    render(<Input label="test" onChange={onChangeHandler} />);

    const inputWrapper = screen.getByRole('input');

    expect(inputWrapper.classList.contains('input')).toBe(true);
    expect(inputWrapper.querySelector('.field')).toBeInTheDocument();
    expect(inputWrapper.querySelector('.text')).toBeInTheDocument();
  });

  it('should trigger onChange handler', () => {
    render(<Input label="test" onChange={onChangeHandler} />);

    const inputWrapper = screen.getByTestId('input');
    const input = inputWrapper.querySelector('.field')!;

    userEvent.change(input, { target: { value: 'abc' } });
    expect(onChangeHandler).toBeCalledTimes(1);
  });
});
