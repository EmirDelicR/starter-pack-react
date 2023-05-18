import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { Input } from './Input';

describe('<Input/>', () => {
  const onChangeHandler = vi.fn();

  it('should render Input', () => {
    render(<Input label="test" onChange={onChangeHandler} value="" />);

    expect(screen.getByPlaceholderText('Enter data')).toBeInTheDocument();
  });

  it('should trigger onChange handler', async () => {
    render(<Input label="test" onChange={onChangeHandler} value="" />);
    const inputText = 'abc';
    const input = screen.getByPlaceholderText('Enter data');

    await userEvent.type(input, inputText);

    expect(onChangeHandler).toBeCalledTimes(inputText.length);
  });

  it('should render hint text', () => {
    render(
      <Input
        label="test"
        onChange={onChangeHandler}
        value=""
        hintText="Some hint"
      />
    );

    expect(screen.getByText('Some hint')).toBeInTheDocument();
  });

  it('should render password and toggle visibility', async () => {
    const user = userEvent.setup();
    render(
      <Input type="password" label="test" onChange={onChangeHandler} value="" />
    );

    const input = screen.getByPlaceholderText('Enter data');
    const passwordToggler = screen.getByRole('password-toggle')!;

    await user.click(passwordToggler);

    expect(input.getAttribute('type')).toEqual('text');

    await user.click(passwordToggler);
    expect(input.getAttribute('type')).toEqual('password');
  });
});
