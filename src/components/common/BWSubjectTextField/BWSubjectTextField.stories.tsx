import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { BWSubjectTextField } from './BWSubjectTextField';
export default {
  title: 'Common/BWSubjectTextField',
  component: BWSubjectTextField,
  parameters: {
    docs: {
      description: {
        component: 'BWSubjectTextField 컴포넌트',
      },
    },
  },
} as ComponentMeta<typeof BWSubjectTextField>;
const Template: ComponentStory<typeof BWSubjectTextField> = args => (
  <BWSubjectTextField {...args} />
);
export const DefaultBWSubjectTextField = Template.bind({});
DefaultBWSubjectTextField.args = {};
