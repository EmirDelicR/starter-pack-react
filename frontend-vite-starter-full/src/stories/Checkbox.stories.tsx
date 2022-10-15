import { Checkbox } from '@/features/UI/atoms/index';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Checkbox',
  component: Checkbox
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);

export const CheckboxTemplate = Template.bind({});
CheckboxTemplate.args = {
  name: 'test',
  id: 'test-id',
  onChangeHandler: (value) => {
    console.log('val: ', value);
  }
};
