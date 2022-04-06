import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  brainWritingSelector,
  getTimerData,
  getUpdatedTimerData,
  updateTimerData,
  setIsTimerCalled,
  setIsTimerOver,
  getVoteTimerData,
} from 'redux/modules/brainWriting';

import { RoomId } from 'redux/modules/brainWriting/types';

type UseTimerProps = {
  type: 'sixhat' | 'brainwritingIdea' | 'brainwritingVote';
  roomId: RoomId;
};

const useTimer = ({ type, roomId }: UseTimerProps) => {
  const dispatch = useAppDispatch();
  const { isTimerCalled, BWtimer } = useAppSelector(brainWritingSelector);

  //타이머 오버시 타이머 반복을 원하지 않을 경우 사용할 useEffect
  useEffect(() => {
    if (type === 'brainwritingIdea') {
      if (!isTimerCalled) {
        dispatch(getTimerData(roomId));
      }
      if (isTimerCalled) {
        dispatch(getUpdatedTimerData(roomId));
      }
    }

    if (type === 'brainwritingVote') {
      if (!isTimerCalled) {
        dispatch(getVoteTimerData(roomId));
      }
      if (isTimerCalled) {
        dispatch(getUpdatedTimerData(roomId));
      }
    }
  }, [isTimerCalled]);

  useEffect(() => {
    if (BWtimer !== null) {
      const interval = setInterval(() => {
        if (BWtimer === 0) {
          dispatch(setIsTimerOver(true));
          dispatch(setIsTimerCalled(false));
          clearInterval(interval);
        } else {
          dispatch(updateTimerData(BWtimer - 1));
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [BWtimer]);
};

export default useTimer;
