import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {
  brainWritingSelector,
  getTimerData,
  getUpdatedTimerData,
  updateTimerData,
  setIsTimerCalled,
} from '@redux/modules/brainWriting';

type UseTimerProps = {
  type: 'sixhat' | 'brainWriting';
  roomId: string;
};

const useTimer = ({ type, roomId }: UseTimerProps) => {
  const dispatch = useAppDispatch();
  const { isTimerCalled, BWtimer } = useAppSelector(brainWritingSelector);

  useEffect(() => {
    if (type === 'brainWriting') {
      if (!isTimerCalled) {
        dispatch(getTimerData(roomId));
      }
      if (isTimerCalled) {
        dispatch(getUpdatedTimerData(roomId));
      }
    }
  }, []);

  useEffect(() => {
    if (BWtimer !== null) {
      const interval = setInterval(() => {
        if (BWtimer === 0) {
          setIsTimerCalled(false);
          clearInterval(interval);
        } else {
          dispatch(updateTimerData(BWtimer - 1));
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [BWtimer]);
};
