import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { Button } from './Button';

describe('<Button/>', () => {
  it('should render button with default classes', () => {
    render(<Button>Test</Button>);
    const button = screen.getByRole('button');
    screen.debug(button);
    expect(button.classList.contains('btn')).eq(true);
    expect(button.classList.contains('primary')).eq(true);
    expect(button.classList.contains('medium')).eq(true);
  });

  it.skip('should render button with default custom class', () => {
    render(<Button className="test">Test</Button>);

    const button = screen.getByRole('button');

    expect(button.classList.contains('test')).eq(true);
  });

  it.skip('should render button with type class secondary', () => {
    render(<Button classType="secondary">Test</Button>);

    const button = screen.getByRole('button');

    expect(button.classList.contains('secondary')).eq(true);
  });

  it.skip('should render button with custom size', () => {
    render(<Button size="large">Test</Button>);

    const button = screen.getByRole('button');

    expect(button.classList.contains('large')).eq(true);
  });

  it.skip('should call custom function on click', async () => {
    const customHandler = vi.fn();
    render(<Button onClickHandler={customHandler}>Test</Button>);

    const button = screen.getByRole('button');

    await userEvent.click(button);

    expect(customHandler).callCount(1);
  });
});
