import { Meta, StoryFn } from '@storybook/react';

import { Accordion } from './Accordion';

export default {
  title: 'Accordion',
  component: Accordion,
  tags: ['autodocs']
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as Meta<typeof Accordion>;

const accordionData = [
  {
    heading: 'Will my license be automatically renewed?',
    content:
      'Non odit magnam dolorum. Et odio et maxime consequuntur provident. Error eaque est dolor et qui. Ex odit doloremque consequatur quis. Eaque et pariatur dolores. Magni in quasi dolor repudiandae explicabo.',
    imageSrc: ''
  },
  {
    heading: 'Can I upgrade my license?',
    content:
      'Quos quam ipsam consequatur consequatur et distinctio. Facere vel ut dolorem. Quam quo neque quos voluptates cupiditate sit quae.',
    imageSrc: ''
  },
  {
    heading: 'Do you provide email support if I need help?',
    content:
      'Vel et quam reprehenderit velit. Possimus accusamus eos esse vero quo modi voluptas hic. Quia illo quisquam vel quis qui. Autem labore aut incidunt. Eius non voluptatem et laboriosam in.',
    imageSrc: ''
  }
];

export const Template: StoryFn<typeof Accordion> = (args) => (
  <Accordion {...args} data={accordionData} />
);
