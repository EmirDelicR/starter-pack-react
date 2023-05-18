import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { Textarea } from './Textarea';

describe('<Textarea/>', () => {
  const onChangeHandler = vi.fn();

  it('should not render label if is not passed', () => {
    render(<Textarea onChangeHandler={onChangeHandler} />);
    const textarea = screen.getByRole('textarea');

    expect(textarea.previousSibling).toBe(null);
  });

  it('should render label if is passed', () => {
    render(<Textarea onChangeHandler={onChangeHandler} label="Some label" />);

    expect(screen.getByText('Some label')).toBeInTheDocument();
  });

  it('should change the state and pass data as object', async () => {
    render(<Textarea onChangeHandler={onChangeHandler} value="Test" />);
    const textarea = screen.getByRole('textarea');
    const text = 'Some test';
    await userEvent.type(textarea, text);

    expect(onChangeHandler).toBeCalledTimes(text.length);
  });
});
