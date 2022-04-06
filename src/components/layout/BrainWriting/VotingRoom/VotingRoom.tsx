import React, { useEffect } from 'react';
import styled from 'styled-components';
import { CenterLayout, PrimaryButton } from 'components/common';
import { VoteCard } from 'components/layout/BrainWriting/VotingRoom/VoteCard';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import {
  getIdeaList,
  brainWritingSelector,
  getVotedIdeaList,
  voteIdea,
} from 'redux/modules/brainWriting';
import { RoomId, IdeaList } from 'redux/modules/brainWriting/types';
import useTimer from 'hooks/useTimer';

type VotingRoomType = {
  roomId: RoomId;
  ideaList: IdeaList;
};

const VotingRoom = ({ roomId, ideaList }: VotingRoomType) => {
  const dispatch = useAppDispatch();
  const { votedIdeaList } = useAppSelector(brainWritingSelector);
  const setVotedIdeaList = new Set(votedIdeaList);

  useEffect(() => {
    dispatch(getIdeaList(roomId));
  }, []);

  useTimer({ type: 'brainwritingVote', roomId });

  const handleGetVotedIdeaList = (ideaId: number) => {
    dispatch(getVotedIdeaList(ideaId));
  };

  const handleVote = () => {
    dispatch(voteIdea());
  };

  return (
    <CenterLayout>
      <>
        <Container>
          {ideaList.map(data => {
            return (
              <VoteCard
                key={data.ideaId}
                idea={data.idea}
                commentList={data.commentList}
                isVoted={setVotedIdeaList.has(data.ideaId)}
                width={330}
                height={200}
                onClick={() => handleGetVotedIdeaList(data.ideaId)}
              >
                {data.idea}
              </VoteCard>
            );
          })}
        </Container>
        <PrimaryButton text="투표하기" onClick={handleVote} />
      </>
    </CenterLayout>
  );
};

const Container = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
`;

export { VotingRoom };
