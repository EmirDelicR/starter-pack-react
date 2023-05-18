import { Meta, StoryFn } from '@storybook/react';

import { Avatar } from '@/UI/components';

export default {
  title: 'Avatar',
  component: Avatar,
  tags: ['autodocs']
} as Meta<typeof Avatar>;

export const AvatarTemplate: StoryFn<typeof Avatar> = (args) => (
  <Avatar {...args} />
);
