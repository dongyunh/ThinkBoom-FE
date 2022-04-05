import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CenterLayout } from '../../../common';
import { VoteCard } from 'components/layout/BrainWriting/VotingRoom/VoteCard';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { getIdeaList, brainWritingSelector } from 'redux/modules/brainWriting';
import useTimer from 'hooks/useTimer';

type VotingRoom = {
  onClick: (arg: string) => void;
};

const VotingRoom = () => {
  const dispatch = useAppDispatch();
  const { roomId, ideaList } = useAppSelector(brainWritingSelector);

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
