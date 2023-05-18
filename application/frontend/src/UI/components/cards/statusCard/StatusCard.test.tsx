import { render, screen } from '@testing-library/react';

import { StatusCard } from './StatusCard';

describe('<StatusCard/>', () => {
  it('should render headline, sub-headline, icon, and text', () => {
    render(
      <StatusCard
        headline="Headline"
        icon={<span>Icon</span>}
        text="Text"
        subHeadline="SubHeadline"
      />
    );

    expect(screen.getByText('Headline')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();
    expect(screen.getByText('Icon')).toBeInTheDocument();
    expect(screen.getByText('SubHeadline')).toBeInTheDocument();
  });
});
