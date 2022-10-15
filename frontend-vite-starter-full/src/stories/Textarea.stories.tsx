import { Textarea } from '@/features/UI/atoms/index';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Textarea',
  component: Textarea
} as ComponentMeta<typeof Textarea>;

const Template: ComponentStory<typeof Textarea> = (args) => (
  <Textarea {...args} />
);

export const TextareaTemplate = Template.bind({});
TextareaTemplate.args = {
  value: 'Test',
  label: 'Label',
  onChangeHandler: (value) => {
    console.log('value: ', value);
  }
};

export const LongTextTextarea = Template.bind({});
LongTextTextarea.args = {
  value:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  label: 'Text label',
  onChangeHandler: (value) => {
    console.log('value: ', value);
  }
};
