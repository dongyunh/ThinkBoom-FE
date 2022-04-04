import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { ChatTextField } from './ChatTextField';

export default {
  title: 'Common/DevatingChatBox/ChatTextField',
  component: ChatTextField,
  parameters: {
    docs: {
      description: {
        component: 'ChatTextField 컴포넌트',
      },
    },
  },
} as ComponentMeta<typeof ChatTextField>;
const Template: ComponentStory<typeof ChatTextField> = args => <ChatTextField {...args} />;
export const DefaultChatTextField = Template.bind({});
