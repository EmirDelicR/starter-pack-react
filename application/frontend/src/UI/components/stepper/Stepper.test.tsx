import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { Stepper } from './Stepper';

vi.mock('react', async () => ({
  ...(await vi.importActual<Record<string, unknown>>('react')),
  useCallback: (func: () => void) => func
}));

describe('<Stepper/>', () => {
  const mockOnClickHandler = vi.fn();
  Object.defineProperty(window, 'crypto', {
    value: { randomUUID: () => Math.random() }
  });

  afterEach(() => {
    mockOnClickHandler.mockReset();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should render stepper with icon and no line if number of steps is 1', () => {
    render(
      <Stepper
        numberOfStages={1}
        currentStep={1}
        onClickHandler={mockOnClickHandler}
      />
    );

    const checkIcon = screen.queryByRole('check-icon')!;
    expect(checkIcon).toBeInTheDocument();
    expect(checkIcon.nextElementSibling).not.toBeInTheDocument();
  });

  it('should render stepper line if number of steps is bigger then 1', () => {
    render(
      <Stepper
        numberOfStages={2}
        currentStep={1}
        onClickHandler={mockOnClickHandler}
      />
    );

    const checkIcon = screen.queryAllByRole('check-icon')[0]!;
    expect(checkIcon.nextElementSibling).toBeInTheDocument();
  });

  it('should not navigate if index is bigger or equal to current step', async () => {
    render(
      <Stepper
        numberOfStages={2}
        currentStep={1}
        onClickHandler={mockOnClickHandler}
      />
    );

    const checkIcon = screen.queryAllByRole('check-icon')[1]!;
    await userEvent.click(checkIcon);

    expect(mockOnClickHandler).toBeCalledTimes(0);
  });

  it('should navigate if index smaller then current step', async () => {
    render(
      <Stepper
        numberOfStages={2}
        currentStep={1}
        onClickHandler={mockOnClickHandler}
      />
    );

    const checkIcon = screen.queryAllByRole('check-icon')[0]!;
    await userEvent.click(checkIcon);

    expect(mockOnClickHandler).toBeCalledTimes(1);
  });
});
