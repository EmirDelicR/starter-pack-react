import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { screen, vi } from 'vitest';

import { Select } from './Select';

describe('<Select/>', () => {
  const onChangeHandler = vi.fn();
  const options = [
    { label: 'test 1', value: 'test 1' },
    { label: 'test 2', value: 2 }
  ];
  const preDefinedValue = { label: 'test 1', value: 'test 1' };

  it('should render select with default classes', () => {
    render(
      <Select options={options} multiple={false} onChange={onChangeHandler} />
    );
    const select = screen.getByRole('select');

    expect(select.classList.contains('container')).toBe(true);
    expect(screen.getByRole('button').classList.contains('clear-btn')).toBe(
      true
    );
    expect(screen.getByRole('select-list').classList.contains('options')).toBe(
      true
    );
  });

  it('should render options of the select', () => {
    render(
      <Select options={options} multiple={false} onChange={onChangeHandler} />
    );

    expect(screen.getByRole('select-list').childNodes.length).toBe(
      options.length
    );
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
    const select = screen.getByRole('select');
    const presetValues = select.querySelectorAll('.value');
    const presetValuesButtons = select.querySelectorAll('.option-badge');

    expect(presetValues.length).toBe(1);
    expect(presetValues[0].innerHTML).toBe('test 1');
    expect(presetValuesButtons.length).toBe(0);
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
    const select = screen.getByRole('select');
    const presetValues = select.querySelectorAll('.option-badge');

    expect(presetValues.length).toBe(2);
  });

  it('should remove predefined entry', () => {
    let value = { label: 'test 1', value: 'test 1' };
    const onChange = vi.fn().mockImplementation((val) => (value = val));

    const { rerender } = render(
      <Select
        options={options}
        multiple={false}
        preDefinedValue={value}
        onChange={onChange}
      />
    );

    const select = screen.getByRole('select');
    const button = select.querySelector('button.clear-btn')!;

    expect(select.querySelectorAll('.value')[0].innerHTML).toBe('test 1');

    userEvent.click(button);
    rerender(
      <Select
        options={options}
        multiple={false}
        preDefinedValue={value}
        onChange={onChange}
      />
    );

    expect(select.querySelectorAll('.value')[0].innerHTML).toBe('');
  });

  it('should remove multiple predefined entries', () => {
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

    const select = screen.getByRole('select');
    const button = select.querySelector('button.clear-btn')!;

    expect(select.querySelectorAll('.option-badge').length).toBe(2);

    userEvent.click(button);
    rerender(
      <Select
        options={options}
        multiple={true}
        preDefinedValue={value}
        onChange={onChange}
      />
    );

    expect(select.querySelectorAll('.option-badge').length).toBe(0);
  });
});
