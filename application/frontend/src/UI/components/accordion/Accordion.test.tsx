import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Accordion } from './Accordion';

describe('<Accordion/>', () => {
  const DUMMY_DATA = [
    { content: 'Some content-1', heading: 'headline-1', imageSrc: '' }
  ];

  it('should not render element in accordion if data is empty array', () => {
    render(<Accordion data={[]} />);

    const headline = screen.queryByRole('heading', {
      level: 3,
      name: 'headline-1'
    });

    expect(headline).not.toBeInTheDocument();
  });

  it('should render elements in accordion if data is not empty array', () => {
    render(<Accordion data={DUMMY_DATA} />);

    expect(screen.getByText('Some content-1')).toBeInTheDocument();
    expect(screen.getByText('headline-1')).toBeInTheDocument();
  });

  it('should open and close accordion on click', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Accordion data={DUMMY_DATA} />);

    const headline = screen.getByRole('button', {
      name: 'headline-1'
    });

    expect(headline.getAttribute('aria-expanded')).toBe('true');

    await user.click(headline);
    rerender(<Accordion data={DUMMY_DATA} />);

    expect(headline.getAttribute('aria-expanded')).toBe('false');
  });
});
