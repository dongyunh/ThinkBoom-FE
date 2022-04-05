import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { VotingRoom } from './VotingRoom';

export default {
  title: 'BrainWriting/VotingRoom',
  component: VotingRoom,
  parameters: {
    docs: {
      description: {
        component: 'VotingRoom 컴포넌트',
      },
    },
  },
  argTypes: {
    idea: {
      description: '아이디어',
      control: { type: 'text' },
    },
  },
} as ComponentMeta<typeof VotingRoom>;
const Template: ComponentStory<typeof VotingRoom> = args => <VotingRoom {...args} />;
export const DefaultCard = Template.bind({});
DefaultCard.args = {
  ideaList: [
    {
      ideaId: 1,
      idea: '저녁 메뉴는 햄버거가 좋을 것 같습니다',
      commentList: [
        '햄버거는 그냥 통과입니다.',
        '점심에 햄버거먹어서 햄버거는 안돼요.',
        '햄버거보다는 피자라고 생각합니다..',
        '맥도날드로 갑시다.',
      ],
    },
    {
      ideaId: 2,
      idea: '저녁 메뉴는 피자가 좋을 것 같습니다',
      commentList: [
        '피자는 그냥 통과입니다.',
        '점심에 피자먹어서 피자는 안돼요.',
        '피자보다는 햄버거라고 생각합니다..',
        '피자스쿨로 갑시다.',
      ],
    },
    {
      ideaId: 3,
      idea: '오늘 저녁은 다같이 굶읍시다',
      commentList: [
        '....?!',
        '굶자는건... 좀 그런데요',
        '밥은 무조건 먹어야 합니다.',
        '당신이나 굶으십시요.',
      ],
    },
    {
      ideaId: 4,
      idea: '당근최고',
      commentList: ['너무 뜬금없는 의견인것 같은데..', '이런 의견은 바로 탈락입니다.'],
    },
  ],
};
