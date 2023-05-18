import { Meta, StoryFn } from '@storybook/react';

import { Upload } from '@/UI/components';

export default {
  title: 'Upload',
  component: Upload,
  tags: ['autodocs']
} as Meta<typeof Upload>;

export const UploadTemplate: StoryFn<typeof Upload> = (args) => (
  <Upload {...args} />
);
