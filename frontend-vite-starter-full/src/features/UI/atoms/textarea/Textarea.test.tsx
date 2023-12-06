import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { Textarea } from './Textarea';

describe('<Textarea/>', () => {
  const onChangeHandler = vi.fn();

  beforeEach(() => {
    onChangeHandler.mockReset();
  });

  it('should render textarea with default classes', () => {
    render(<Textarea onChangeHandler={onChangeHandler} />);
    const textarea = screen.getByRole('textarea');

    expect(textarea.classList.contains('textarea')).toBe(true);
  });

  it('should not render label if is not passed', () => {
    render(<Textarea onChangeHandler={onChangeHandler} />);
    const textarea = screen.getByRole('textarea');

    expect(textarea.previousSibling).toBe(null);
  });

  it('should render label if is passed', () => {
    render(<Textarea onChangeHandler={onChangeHandler} label="Some label" />);
    const label = screen.getByText('Some label');

    expect(label).toBeInTheDocument();
  });
});
