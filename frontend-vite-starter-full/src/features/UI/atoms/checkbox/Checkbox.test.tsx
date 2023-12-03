import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { Checkbox } from './Checkbox';

describe('<Checkbox/>', () => {
  const onChangeHandler = vi.fn();

  it('should render checkbox with default classes', () => {
    render(
      <Checkbox
        name="test"
        id="checkbox-id"
        onChangeHandler={onChangeHandler}
      />
    );
    const checkbox = screen.getByRole('checkbox');

    // expect(checkbox.classList.contains('checkbox')).toBe(true);
    expect(checkbox.hasAttribute('name')).toBe(true);
    expect(checkbox.getAttribute('name')).toBe('test');
    expect(checkbox.hasAttribute('id')).toBe(true);
    expect(checkbox.getAttribute('id')).toBe('checkbox-id');
  });

  it('should change the state and pass data as object', async () => {
    render(
      <Checkbox
        name="test"
        id="checkbox-id"
        onChangeHandler={onChangeHandler}
      />
    );
    const checkbox = screen.getByRole('checkbox');

    await userEvent.click(checkbox);

    expect(onChangeHandler).toBeCalledWith({ test: true });
  });
});
