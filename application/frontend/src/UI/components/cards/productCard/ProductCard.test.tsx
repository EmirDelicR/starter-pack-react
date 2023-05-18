import { render, screen } from '@testing-library/react';

import { ProductCard } from './ProductCard';

describe('<ProductCard/>', () => {
  it('should render elements', () => {
    render(<ProductCard rank={2} name="Name" url="some-url" />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByAltText('product-card-image')).toBeInTheDocument();
    expect(screen.getByText('539.9k')).toBeInTheDocument();
    expect(screen.getAllByTitle('Avatar').length).toEqual(6);
    expect(screen.getByText('See more')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
