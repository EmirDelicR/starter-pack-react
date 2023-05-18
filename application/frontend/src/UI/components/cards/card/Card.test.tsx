import { render, screen } from '@testing-library/react';

import { Card } from './Card';

describe('<Card/>', () => {
  it('should render headline, icon, and text', () => {
    render(<Card headline="Headline" icon={<span>Icon</span>} text="Text" />);

    expect(screen.getByText('Headline')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();
    expect(screen.getByText('Icon')).toBeInTheDocument();
  });
});
