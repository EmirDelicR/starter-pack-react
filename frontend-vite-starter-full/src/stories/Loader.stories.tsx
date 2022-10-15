import { Loader } from '@/features/UI/atoms/index';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FaRocket } from 'react-icons/fa';

export default {
  title: 'Loader',
  component: Loader
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = (args) => <Loader {...args} />;

export const Size100WithIcon = Template.bind({});
Size100WithIcon.args = {
  size: 100,
  children: <FaRocket />
};

export const Size100 = Template.bind({});
Size100.args = {
  size: 100
};

export const Size50 = Template.bind({});
Size50.args = {
  size: 50
};
