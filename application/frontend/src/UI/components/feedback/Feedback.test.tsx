import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { Feedback } from './Feedback';

vi.mock('@/UI/components/rating/Rating', () => ({
  Rating: () => 'Mocked rating'
}));

describe('<Feedback/>', () => {
  it('should render name, rating, quote and children', () => {
    render(
      <Feedback name="Some name" rating={2} quote="Some quote">
        <span>Childe</span>
      </Feedback>
    );

    expect(screen.getByText('Some name')).toBeInTheDocument();
    expect(screen.getByText('Some quote')).toBeInTheDocument();
    expect(screen.getByText('Mocked rating')).toBeInTheDocument();
    expect(screen.getByText('Childe')).toBeInTheDocument();
  });
});
