import { Meta, StoryFn } from '@storybook/react';

import { Select } from '@/UI/components';

export default {
  title: 'Select',
  component: Select,
  tags: ['autodocs']
} as Meta<typeof Select>;

const options = [
  { label: 'test 1', value: 'test 1' },
  { label: 'test 2', value: 2 },
  { label: 'test 3', value: 3 },
  { label: 'test 4', value: 'test 2' },
  { label: 'test 5', value: 4 }
];

export const SingleSelect: StoryFn<typeof Select> = (args) => (
  <Select
    {...args}
    multiple={false}
    onChange={() => undefined}
    options={options}
    preDefinedValue={{ label: 'test 1', value: 'test 1' }}
  />
);

export const MultiSelect: StoryFn<typeof Select> = (args) => (
  <Select
    {...args}
    multiple={true}
    onChange={() => undefined}
    options={options}
    preDefinedValue={[
      { label: 'test 1', value: 'test 1' },
      { label: 'test 2', value: 2 }
    ]}
  />
);
