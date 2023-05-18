import { Meta, StoryFn } from '@storybook/react';

import { Feedback } from '@/UI/components';

export default {
  title: 'Feedback',
  component: Feedback,
  tags: ['autodocs']
} as Meta<typeof Feedback>;

export const Rating: StoryFn<typeof Feedback> = (args) => (
  <Feedback {...args} rating={3.5} name="John Doe" />
);
