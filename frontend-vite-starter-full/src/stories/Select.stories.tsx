import { Select } from '@/features/UI/atoms/index';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Select',
  component: Select
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const SingleSelect = Template.bind({});
SingleSelect.args = {
  multiple: false,
  onChange: () => {
    console.log('Test');
  },
  options: [
    { label: 'test 1', value: 'test 1' },
    { label: 'test 2', value: 2 },
    { label: 'test 3', value: 3 },
    { label: 'test 4', value: 'test 2' },
    { label: 'test 5', value: 4 }
  ],
  preDefinedValue: { label: 'test 1', value: 'test 1' }
};

export const MultiSelect = Template.bind({});
MultiSelect.args = {
  multiple: true,
  onChange: (value) => {
    console.log('value: ', value);
  },
  options: [
    { label: 'test 1', value: 'test 1' },
    { label: 'test 2', value: 2 },
    { label: 'test 3', value: 3 },
    { label: 'test 4', value: 'test 2' },
    { label: 'test 5', value: 4 }
  ],
  preDefinedValue: [
    { label: 'test 1', value: 'test 1' },
    { label: 'test 2', value: 2 },
    { label: 'test 3', value: 3 },
    { label: 'test 4', value: 'test 2' },
    { label: 'test 5', value: 4 }
  ]
};
