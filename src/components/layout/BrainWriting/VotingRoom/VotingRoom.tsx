import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CenterLayout } from '../../../common';
import { VoteCard } from '@components/layout/BrainWriting/VotingRoom/VoteCard';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { VoteCardModal } from '@components/layout/BrainWriting/VotingRoom/VoteCardModal';
import { getIdeaList } from '@redux/modules/brainWriting';
import { Modal } from '@components/common/Modals';
import { useRouter } from 'next/router';
import useTimer from '@hooks/useTimer';

type VotingRoom = {
  onClick: (arg: string) => void;
};

const VotingRoom = () => {
  const dispatch = useAppDispatch();
  // const { senderId, bwRoomId, BWsubject } = useAppSelector(brainWritingSelector);
  const router = useRouter();
  const roomInfo = router.query.roomInfo as string[];
  const BWRoomId = roomInfo[1];

  useEffect(() => {
    dispatch(getIdeaList(BWRoomId));
  }, []);

  useTimer({ type: 'brainwritingVote', roomId: BWRoomId });

  return (
    <CenterLayout>
      <Container>
        <VoteCard width={330} height={200}>
          sss
        </VoteCard>
      </Container>
    </CenterLayout>
  );
};

const Container = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 330px;
  grid-auto-columns: 1fr 2fr;
  /* grid-template-columns: 1fr 1fr 1fr 1fr 1fr; */
`;

export { VotingRoom };
