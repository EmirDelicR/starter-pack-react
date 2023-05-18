import { render, screen } from '@testing-library/react';

import { IconType, Message } from './Message';

describe('<Message/>', () => {
  it('should render message and info icon', () => {
    render(<Message message="Test" />);

    expect(screen.getByRole('icon-info')).toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should render message and error icon', () => {
    render(<Message message="Test" type={IconType.ERROR} />);

    expect(screen.getByRole('icon-error')).toBeInTheDocument();
  });

  it('should render message and success icon', () => {
    render(<Message message="Test" type={IconType.SUCCESS} />);

    expect(screen.getByRole('icon-success')).toBeInTheDocument();
  });

  it('should render message and warning icon', () => {
    render(<Message message="Test" type={IconType.WARNING} />);

    expect(screen.getByRole('icon-warning')).toBeInTheDocument();
  });

  it('should render only message if icon type is none', () => {
    render(<Message message="Test" type={IconType.NONE} />);

    expect(screen.queryByRole('icon-warning')).not.toBeInTheDocument();
    expect(screen.queryByRole('icon-info')).not.toBeInTheDocument();
    expect(screen.queryByRole('icon-error')).not.toBeInTheDocument();
    expect(screen.queryByRole('icon-success')).not.toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
