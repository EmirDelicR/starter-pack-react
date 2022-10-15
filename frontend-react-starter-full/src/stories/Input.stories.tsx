import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Input } from 'features/UI/atoms/index';

export default {
  title: 'Input',
  component: Input
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const InputTemplate = Template.bind({});
InputTemplate.args = {
  type: 'email',
  label: 'Enter Email',
  onChange: () => {}
};
