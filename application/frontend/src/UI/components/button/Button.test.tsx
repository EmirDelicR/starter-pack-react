import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { Button } from './Button';

describe('<Button/>', () => {
  it('should render button with default custom class', () => {
    render(<Button className="test">Test</Button>);

    const button = screen.getByRole('button');

    expect(button.classList.contains('test')).toBe(true);
  });

  it('should render button that is disabled', () => {
    render(<Button isDisabled={true}>Test</Button>);

    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('disabled');
  });

  it('should call custom function on click', async () => {
    const customHandler = vi.fn();
    render(<Button onClick={customHandler}>Test</Button>);

    const button = screen.getByRole('button');

    await userEvent.click(button);

    expect(customHandler).toBeCalledTimes(1);
  });
});
