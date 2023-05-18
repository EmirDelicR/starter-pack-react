import { Meta, StoryFn } from '@storybook/react';

import { Checkbox } from '@/UI/components';

export default {
  title: 'Checkbox',
  component: Checkbox,
  tags: ['autodocs']
} as Meta<typeof Checkbox>;

export const Checked: StoryFn<typeof Checkbox> = (args) => (
  <Checkbox {...args} isChecked={true} />
);

export const Default: StoryFn<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);
