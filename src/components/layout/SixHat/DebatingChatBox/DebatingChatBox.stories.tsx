import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { DebatingChatBox } from './DebatingChatBox';

export default {
  title: 'Common/DebatingChatBox',
  component: DebatingChatBox,
  parameters: {
    docs: {
      description: {
        component: 'DebatingChatBox 컴포넌트',
      },
    },
  },
  argTypes: {
    subject: {
      description: '주제',
      control: { type: 'text' },
    },
  },
} as ComponentMeta<typeof DebatingChatBox>;
const Template: ComponentStory<typeof DebatingChatBox> = args => <DebatingChatBox {...args} />;
export const DefaultDebatingChatBox = Template.bind({});
