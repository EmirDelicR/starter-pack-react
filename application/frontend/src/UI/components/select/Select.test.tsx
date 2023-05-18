import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { Select } from './Select';

describe('<Select/>', () => {
  const onChangeHandler = vi.fn();
  const options = [
    { label: 'test 1', value: 'test 1' },
    { label: 'test 2', value: 2 }
  ];
  const preDefinedValue = { label: 'test 1', value: 'test 1' };

  it('should render options of the select', () => {
    render(
      <Select options={options} multiple={false} onChange={onChangeHandler} />
    );

    expect(screen.getByText('test 1')).toBeInTheDocument();
    expect(screen.getByText('test 2')).toBeInTheDocument();
  });

  it('should render predefined entries', () => {
    render(
      <Select
        options={options}
        multiple={false}
        preDefinedValue={preDefinedValue}
        onChange={onChangeHandler}
      />
    );

    expect(screen.queryAllByText('test 1').length).toEqual(2);
  });

  it('should render multiple predefined entries', () => {
    render(
      <Select
        options={options}
        multiple={true}
        preDefinedValue={[
          preDefinedValue,
          { label: 'test 2', value: 'test 2' }
        ]}
        onChange={onChangeHandler}
      />
    );

    expect(screen.queryAllByText('test 1').length).toEqual(2);
    expect(screen.queryAllByText('test 2').length).toEqual(2);
  });

  it('should remove multiple predefined entries', async () => {
    let value = [
      { label: 'test 1', value: 'test 1' },
      { label: 'test 2', value: 'test 2' }
    ];
    const onChange = vi.fn().mockImplementation((val) => (value = val));

    const { rerender } = render(
      <Select
        options={options}
        multiple={true}
        preDefinedValue={value}
        onChange={onChange}
      />
    );

    const button = screen.getByRole('button', { name: 'x' });

    expect(
      screen.getByRole('button', { name: 'test 1 x' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'test 2 x' })
    ).toBeInTheDocument();

    await userEvent.click(button);
    rerender(
      <Select
        options={options}
        multiple={true}
        preDefinedValue={value}
        onChange={onChange}
      />
    );

    expect(
      screen.queryByRole('button', { name: 'test 1 x' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'test 2 x' })
    ).not.toBeInTheDocument();
  });
});
