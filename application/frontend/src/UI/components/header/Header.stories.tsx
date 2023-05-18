import { Meta, StoryFn } from '@storybook/react';

import { Header } from '@/UI/components';

export default {
  title: 'Header',
  component: Header,
  tags: ['autodocs']
} as Meta<typeof Header>;

export const HeaderLight: StoryFn<typeof Header> = (args) => (
  <Header
    {...args}
    dataColor="light"
    subHeadline="Sub headline"
    headline="Headline"
  >
    <span>Test</span>
  </Header>
);

export const HeaderFilter: StoryFn<typeof Header> = (args) => (
  <Header
    {...args}
    hasFilter={true}
    subHeadline="Sub headline"
    headline="Headline"
    dataColor="light"
  >
    <span>Test</span>
  </Header>
);
