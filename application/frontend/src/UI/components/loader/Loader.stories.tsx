import { Meta, StoryFn } from '@storybook/react';

import { Loader } from '@/UI/components';

export default {
  title: 'Loader',
  component: Loader,
  tags: ['autodocs']
} as Meta<typeof Loader>;

export const LoaderTemplate: StoryFn<typeof Loader> = (args) => (
  <Loader {...args} />
);
