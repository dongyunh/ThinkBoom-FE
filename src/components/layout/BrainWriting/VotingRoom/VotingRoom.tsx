import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CenterLayout } from '../../../common';
import { VoteCard } from '@components/layout/BrainWriting/VotingRoom/VoteCard';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { VoteCardModal } from '@components/layout/BrainWriting/VotingRoom/VoteCardModal';
import { timerData, brainWritingSelector } from '@redux/modules/brainWriting';
import { Modal } from '@components/common/Modals';

type VotingRoom = {
  onClick: (arg: string) => void;
};

const VotingRoom = () => {
  // const dispatch = useAppDispatch();
  // const { senderId, bwRoomId, BWsubject } = useAppSelector(brainWritingSelector);
  // useEffect(() => {
  //   dispatch(timerData(bwRoomId));
  // }, []);

  return (
    <CenterLayout>
      <VoteCard width={330} height={200}>
        sss
      </VoteCard>
      <VoteCard width={330} height={200}>
        sdsd
      </VoteCard>
      <VoteCard width={330} height={200}>
        sssddd
      </VoteCard>
    </CenterLayout>
  );
};

export { VotingRoom };
