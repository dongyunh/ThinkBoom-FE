import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {
  brainWritingSelector,
  getTimerData,
  getUpdatedTimerData,
  updateTimerData,
  setIsTimerCalled,
  setIsTimerOver,
} from '@redux/modules/brainWriting';

type UseTimerProps = {
  type: 'sixhat' | 'brainwriting';
  roomId: string;
  isRotate: boolean;
};

const useTimer = ({ type, roomId, isRotate }: UseTimerProps) => {
  const dispatch = useAppDispatch();
  const { isTimerCalled, BWtimer } = useAppSelector(brainWritingSelector);

  //타이머 오버시 타이머 반복을 원하지 않을 경우 사용할 useEffect
  useEffect(() => {
    if (type === 'brainwriting' || !isRotate) {
      if (!isTimerCalled) {
        dispatch(getTimerData(roomId));
      }
      if (isTimerCalled) {
        dispatch(getUpdatedTimerData(roomId));
      }
    }
  }, []);

  //타이머 오버시 타이머 반복을 원하는 경우 사용할 useEffect
  useEffect(() => {
    if (type === 'brainwriting' || isRotate) {
      if (!isTimerCalled) {
        dispatch(getTimerData(roomId));
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
