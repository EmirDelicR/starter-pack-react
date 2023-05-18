import { Meta, StoryFn } from '@storybook/react';

import { IconType, Message } from '@/UI/components';

export default {
  title: 'Message',
  component: Message,
  tags: ['autodocs']
} as Meta<typeof Message>;

const message =
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry.';

export const Info: StoryFn<typeof Message> = (args) => (
  <Message {...args} message={message} />
);

export const Error: StoryFn<typeof Message> = (args) => (
  <Message {...args} message={message} type={IconType.ERROR} />
);

export const Warning: StoryFn<typeof Message> = (args) => (
  <Message {...args} message={message} type={IconType.WARNING} />
);

export const Success: StoryFn<typeof Message> = (args) => (
  <Message {...args} message={message} type={IconType.SUCCESS} />
);

export const WithoutIcon: StoryFn<typeof Message> = (args) => (
  <Message {...args} message={message} type={IconType.NONE} />
);

export const LongText: StoryFn<typeof Message> = (args) => (
  <Message
    {...args}
    message={
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
  />
);
