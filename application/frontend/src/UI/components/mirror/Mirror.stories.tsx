import { Meta, StoryFn } from '@storybook/react';

import { Mirror } from '@/UI/components';

export default {
  title: 'Mirror',
  component: Mirror,
  tags: ['autodocs']
} as Meta<typeof Mirror>;

export const MirrorTemplate: StoryFn<typeof Mirror> = () => <Mirror />;
