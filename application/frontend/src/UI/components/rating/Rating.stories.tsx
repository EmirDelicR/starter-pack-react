import { Meta, StoryFn } from '@storybook/react';

import { Rating } from '@/UI/components';

export default {
  title: 'Rating',
  component: Rating
} as Meta<typeof Rating>;

export const RatingTemplate: StoryFn<typeof Rating> = (args) => (
  <Rating {...args} value={2.5} />
);
