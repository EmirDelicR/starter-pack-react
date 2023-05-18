import { render, screen } from '@testing-library/react';

import { Header } from './Header';

describe('<Header/>', () => {
  it('should render headline with children', () => {
    render(
      <Header headline="Some headline" subHeadline="Some sub-headline">
        <span>Test</span>
      </Header>
    );

    expect(screen.getByText('Some headline')).toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Some sub-headline')).toBeInTheDocument();
  });
});
