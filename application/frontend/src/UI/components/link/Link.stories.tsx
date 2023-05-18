import { Meta, StoryFn } from '@storybook/react';

import { Link } from '@/UI/components';

export default {
  title: 'Link',
  component: Link,
  tags: ['autodocs']
} as Meta<typeof Link>;

export const LinkTemplate: StoryFn<typeof Link> = (args) => (
  <Link {...args}>Link</Link>
);
