import { render, screen } from '@testing-library/react';

import { Hero } from './Hero';

describe('<Hero/>', () => {
  it('should render left and right side content', () => {
    render(<Hero leftSideContent={<div>Left</div>} rightSideContent={<div>Right</div>} />);

    expect(screen.getByText('Left')).toBeInTheDocument();
    expect(screen.getByText('Right')).toBeInTheDocument();
  });
});
