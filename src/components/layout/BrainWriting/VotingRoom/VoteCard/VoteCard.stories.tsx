import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { VoteCard } from './VoteCard';

export default {
  title: 'Common/VoteCard',
  component: VoteCard,
  parameters: {
    docs: {
      description: {
        component: 'VoteCard 컴포넌트',
      },
    },
  },
  argTypes: {
    idea: {
      description: '아이디어',
      control: { type: 'text' },
    },
  },
} as ComponentMeta<typeof VoteCard>;
const Template: ComponentStory<typeof VoteCard> = args => <VoteCard {...args} />;
export const DefaultCard = Template.bind({});
DefaultCard.args = {
  idea: '오늘 저녁메뉴로 오리고기가 좋습니다.',
  commentList: [
    '아니 그건좀 아닙니다.',
    '오호 그것참 좋은 의견입니다.',
    '아니 그래서 어떻게 하자는 겁니까?',
    '오리고기는 니가 사줘',
    '그래그래 내가 살께',
  ],
};
