import { render, screen } from '@testing-library/react';

import { Slider } from './Slider';

describe('<Slider/>', () => {
  const DUMMY_DATA = [{ url: 'url', name: 'name', rating: 2 }];

  it('should not render element in slider if items is empty array', () => {
    render(<Slider items={[]} />);

    expect(screen.queryByTestId('slider')).not.toBeInTheDocument();
  });

  it('should render element for normal slider', () => {
    render(<Slider items={DUMMY_DATA} />);

    expect(screen.getByTestId('slider')).toBeInTheDocument();
    expect(screen.getByRole('arrow-back')).toBeInTheDocument();
    expect(screen.getByRole('arrow-forward')).toBeInTheDocument();
    expect(screen.getByTestId('dots')).toBeInTheDocument();
  });

  it('should not render arrows and dots if flag is passed', () => {
    render(<Slider items={DUMMY_DATA} showArrows={false} showDots={false} />);

    expect(screen.queryByRole('arrow-back')).not.toBeInTheDocument();
    expect(screen.queryByRole('arrow-forward')).not.toBeInTheDocument();
  });

  it('should render testimonial slider if flag is passed', () => {
    render(<Slider items={DUMMY_DATA} isTestimonial={true} />);

    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByTitle('Avatar')).toBeInTheDocument();
  });
});
