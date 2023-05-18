import { Meta, StoryFn } from '@storybook/react';

import { Stepper } from '@/UI/components';

export default {
  title: 'Stepper',
  component: Stepper,
  tags: ['autodocs']
} as Meta<typeof Stepper>;

export const StepperDefault: StoryFn<typeof Stepper> = (args) => (
  <Stepper {...args} numberOfStages={3} currentStep={0} />
);

export const StepperLevelOne: StoryFn<typeof Stepper> = (args) => (
  <Stepper {...args} numberOfStages={3} currentStep={1} />
);

export const StepperLevelTwo: StoryFn<typeof Stepper> = (args) => (
  <Stepper {...args} numberOfStages={3} currentStep={2} />
);
