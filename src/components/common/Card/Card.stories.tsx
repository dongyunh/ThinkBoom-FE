import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Card } from './Card';
// import GlobalStyles from 'theme/GlobalStyles';

export default {
  title: 'Common/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component: 'Card 컴포넌트',
      },
    },
  },
  argTypes: {
    width: {
      description: '너비',
      control: { type: 'number' },
    },
    height: {
      description: '높이',
      control: { type: 'number' },
    },
  },
} as ComponentMeta<typeof Card>;
const Template: ComponentStory<typeof Card> = args => <Card {...args} />;
export const DefaultCard = Template.bind({});
DefaultCard.args = {
  width: 100,
  height: 100,
};
