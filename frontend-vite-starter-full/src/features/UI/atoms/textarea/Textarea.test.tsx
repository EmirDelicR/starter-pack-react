import { fireEvent, render, screen } from '@testing-library/react';

import { Textarea } from './Textarea';

describe('<Textarea/>', () => {
  const onChangeHandler = jest.fn().mockImplementation((_value) => {});

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

  it('should change the state and pass data as object', () => {
    render(<Textarea onChangeHandler={onChangeHandler} value="Test" />);
    const textarea = screen.getByRole('textarea');

    fireEvent.change(textarea, { target: { value: 'Some test' } });

    expect(onChangeHandler).toBeCalledWith({ value: 'Some test' });
  });
});
