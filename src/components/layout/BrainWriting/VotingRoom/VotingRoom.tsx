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

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type VotingRoomType = {
  roomId: RoomId;
  onClickComplete: () => void;
};

const VotingRoom = ({ roomId, onClickComplete }: VotingRoomType) => {
  const dispatch = useAppDispatch();
  const { votedIdeaList, isTimerOver, BWtimer, ideaList, isAllVoted } =
    useAppSelector(brainWritingSelector);
  const setVotedIdeaList = new Set(votedIdeaList);

  useTimer({ type: 'brainwritingVote', roomId });

  const handleGetVotedIdeaList = (ideaId: number) => {
    dispatch(getVotedIdeaList(ideaId));
  };

  const handleVote = () => {
    dispatch(voteIdea());
  };

  useEffect(() => {
    dispatch(getIdeaList(roomId));
  }, []);

  useEffect(() => {
    if (isTimerOver || isAllVoted) {
      onClickComplete();
    }
  }, [isTimerOver, isAllVoted]);

  useEffect(() => {
    if (BWtimer === 10) {
      toast.info('10초 뒤에 투표가 종료됩니다. 투표를 완료해주세요.');
    }
  }, [BWtimer]);

  return (
    <>
      <ToastContainer position="bottom-left" autoClose={10000} theme="dark" />
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
                  onClick={() => handleGetVotedIdeaList(data.ideaId)}
                />
              );
            })}
          </Container>
          <PrimaryButton text="투표하기" onClick={handleVote} />
        </>
      </CenterLayout>
    </>
  );
};

const Container = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
`;

export { VotingRoom };
