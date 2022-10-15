import { fireEvent, render, screen } from '@testing-library/react';

import { Checkbox } from './Checkbox';

describe('<Checkbox/>', () => {
  const onChangeHandler = jest.fn().mockImplementation((_value) => {});

  it('should render checkbox with default classes', () => {
    render(<Checkbox name="test" id="checkbox-id" onChangeHandler={onChangeHandler} />);
    const checkbox = screen.getByRole('checkbox');

    expect(checkbox.classList.contains('checkbox')).toBe(true);
    expect(checkbox.hasAttribute('name')).toBe(true);
    expect(checkbox.getAttribute('name')).toBe('test');
    expect(checkbox.hasAttribute('id')).toBe(true);
    expect(checkbox.getAttribute('id')).toBe('checkbox-id');
  });

  it('should change the state and pass data as object', () => {
    render(<Checkbox name="test" id="checkbox-id" onChangeHandler={onChangeHandler} />);
    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);

    expect(onChangeHandler).toBeCalledWith({ test: true });
  });
});
