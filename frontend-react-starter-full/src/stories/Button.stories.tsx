import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from 'features/UI/atoms/index';

export default {
  title: 'Button',
  component: Button
} as ComponentMeta<typeof Button>;

export const ButtonTemplate: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>Submit</Button>
);
