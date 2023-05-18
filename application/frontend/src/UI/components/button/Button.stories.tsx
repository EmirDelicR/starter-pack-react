import { Meta, StoryFn } from '@storybook/react';

import { Button } from '@/UI/components';

export default {
  title: 'Button',
  component: Button,
  tags: ['autodocs']
} as Meta<typeof Button>;

export const Default: StoryFn<typeof Button> = (args) => (
  <Button {...args}>Submit</Button>
);

export const Secondary: StoryFn<typeof Button> = (args) => (
  <Button {...args} classType="secondary">
    Submit
  </Button>
);

export const Small: StoryFn<typeof Button> = (args) => (
  <Button {...args} size="small">
    Submit
  </Button>
);

export const Medium: StoryFn<typeof Button> = (args) => (
  <Button {...args} size="medium">
    Submit
  </Button>
);

export const Large: StoryFn<typeof Button> = (args) => (
  <Button {...args} size="large">
    Submit
  </Button>
);

export const Icon: StoryFn<typeof Button> = (args) => (
  <Button {...args} size="icon">
    +
  </Button>
);

export const Disabled: StoryFn<typeof Button> = (args) => (
  <Button {...args} isDisabled={true}>
    Button
  </Button>
);
