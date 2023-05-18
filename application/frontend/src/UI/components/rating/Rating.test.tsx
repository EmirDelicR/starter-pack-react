import { render, screen } from '@testing-library/react';

import { Rating } from './Rating';

describe('<Rating/>', () => {
  it('should render always five stars', () => {
    render(<Rating />);

    const rating = screen.getByTestId('rating');
    expect(rating.childNodes.length).toEqual(5);
  });
});
