import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from './App';

describe('Simple working test', () => {
  it('the title is visible', () => {
    render(<App />);

    const welcomeText = screen.getByText('Setup ne project');

    screen.debug(welcomeText);

    expect(welcomeText).toBeInTheDocument();
  });
});
