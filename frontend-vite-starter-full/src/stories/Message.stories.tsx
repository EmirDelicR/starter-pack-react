import { IconType, Message } from '@/features/UI/atoms/index';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Message',
  component: Message
} as ComponentMeta<typeof Message>;

const Template: ComponentStory<typeof Message> = (args) => (
  <Message {...args} />
);

export const InfoTemplate = Template.bind({});
InfoTemplate.args = {
  message:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
};

export const ErrorTemplate = Template.bind({});
ErrorTemplate.args = {
  type: IconType.ERROR,
  message:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
};

export const WarningTemplate = Template.bind({});
WarningTemplate.args = {
  type: IconType.WARNING,
  message:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
};

export const SuccessTemplate = Template.bind({});
SuccessTemplate.args = {
  type: IconType.SUCCESS,
  message:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
};

export const NoIconTemplate = Template.bind({});
NoIconTemplate.args = {
  type: IconType.NONE,
  message:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
};

export const LongTextMessage = Template.bind({});
LongTextMessage.args = {
  message:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
};
