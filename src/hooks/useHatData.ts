import React, { useState } from 'react';

const useHatData = () => {
  const [isRedOver, setIsRedOver] = useState(false);
  const [isBlackOver, setIsBlackOver] = useState(false);
  const [isGreenOver, setIsGreenOver] = useState(false);
  const [isBlueOver, setIsBlueOver] = useState(false);
  const [isYellowOver, setIsYellowOver] = useState(false);
  const [isWhiteOver, setIsWhiteOver] = useState(false);

  const hatData = [
    {
      value: 'red',
      text: '빨간모자',
      desc: '직관주의자, 순간적인 느낌에 충실',
      isOver: isRedOver,
      setIsOver: () => {
        return setIsRedOver(!isRedOver);
      },
    },
    {
      value: 'black',
      text: '검정모자',
      desc: '비관주의자, 아이디어의 문제점을 도출 ',
      isOver: isBlackOver,
      setIsOver: () => {
        return setIsBlackOver(!isBlackOver);
      },
    },
    {
      value: 'green',
      text: '초록모자',
      desc: '몽상주의자, 새로운 아이디어 생성',
      isOver: isGreenOver,
      setIsOver: () => {
        return setIsGreenOver(!isGreenOver);
      },
    },
    {
      value: 'blue',
      text: '파란모자',
      desc: '사회자, 회의를 주관하며 요약 및 결론을 유도 ',
      isOver: isBlueOver,
      setIsOver: () => {
        return setIsBlueOver(!isBlueOver);
      },
    },
    {
      value: 'yellow',
      text: '노란모자',
      desc: '낙관주의자, 아이디어를 긍정적으로 생각 ',
      isOver: isYellowOver,
      setIsOver: () => {
        return setIsYellowOver(!isYellowOver);
      },
    },
    {
      value: 'white',
      text: '하얀모자',
      desc: '이성주의자, 객관적인 정보에 집중',
      isOver: isWhiteOver,
      setIsOver: () => {
        return setIsWhiteOver(!isWhiteOver);
      },
    },
  ];

  return hatData;
};

export default useHatData;
