import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CenterLayout } from '../../../common';
import { VoteCard } from 'components/layout/BrainWriting/VotingRoom/VoteCard';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { getIdeaList, brainWritingSelector } from 'redux/modules/brainWriting';
import { RoomId, IdeaList } from 'redux/modules/brainWriting/types';
import useTimer from 'hooks/useTimer';

type VotingRoomType = {
  onClick: (arg: string) => void;
  roomId: RoomId;
  ideaList: IdeaList;
};

const VotingRoom = ({ roomId, ideaList, onClick }: VotingRoomType) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getIdeaList(roomId));
  }, []);

  useTimer({ type: 'brainwritingVote', roomId });

  return (
    <CenterLayout>
      <Container>
        {ideaList.map(data => {
          return (
            <VoteCard
              key={data.ideaId}
              idea={data.idea}
              commentList={data.commentList}
              width={330}
              height={200}
            >
              {data.idea}
            </VoteCard>
          );
        })}
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
