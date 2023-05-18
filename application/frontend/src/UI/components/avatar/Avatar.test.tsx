import { render, screen } from '@testing-library/react';

import { Avatar } from './Avatar';

describe('<Avatar/>', () => {
  it('should render placeholder icon if no src is set', () => {
    render(<Avatar />);

    expect(screen.getByTitle('Avatar')).toBeInTheDocument();
  });

  it('should render children if no src is set and childe is passed', () => {
    render(
      <Avatar>
        <div>Test</div>
      </Avatar>
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should render image if src is set', () => {
    render(<Avatar src="test" />);

    expect(screen.getByAltText('Avatar image')).toBeInTheDocument();
  });
});
