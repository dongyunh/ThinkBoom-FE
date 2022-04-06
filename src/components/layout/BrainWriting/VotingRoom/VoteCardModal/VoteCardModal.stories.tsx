import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { S_VoteCardModal } from './S_VoteCardModal';

export default {
  title: 'BrainWriting/VoteCardModal',
  component: S_VoteCardModal,
  parameters: {
    docs: {
      description: {
        component: 'VoteCardModal 컴포넌트',
      },
    },
  },
  argTypes: {
    idea: {
      description: '아이디어',
      control: { type: 'text' },
    },
  },
} as ComponentMeta<typeof S_VoteCardModal>;
const Template: ComponentStory<typeof S_VoteCardModal> = args => <S_VoteCardModal {...args} />;
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
