import { render, screen } from '@testing-library/react';

import { Loader } from './Loader';

describe('<Loader/>', () => {
  it('should render loader content if size is bigger or equal to 3', () => {
    render(<Loader size={3} />);

    expect(screen.getByRole('loader')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should not render loader content if size is bigger or equal to 3', () => {
    render(<Loader size={2} />);

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  it('should set size to 1 if size is less then 1', () => {
    render(<Loader size={-2} />);

    const loader = screen.getByRole('loader');

    expect(loader.style.getPropertyValue('--size')).toEqual('1em');
  });

  it('should set size to 10 if size is bigger then 10', () => {
    render(<Loader size={12} />);

    const loader = screen.getByRole('loader');

    expect(loader.style.getPropertyValue('--size')).toEqual('10em');
  });
});
