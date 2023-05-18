import { Meta, StoryFn } from '@storybook/react';

import { Input } from '@/UI/components';

export default {
  title: 'Input',
  component: Input,
  tags: ['autodocs']
} as Meta<typeof Input>;

export const Default: StoryFn<typeof Input> = (args) => (
  <Input {...args} onChange={() => undefined} label="Label" value="" />
);

export const WithHint: StoryFn<typeof Input> = (args) => (
  <Input
    {...args}
    onChange={() => undefined}
    label="Label"
    value=""
    hintText="Hint"
  />
);
