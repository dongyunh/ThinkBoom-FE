import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../../theme/styleTheme';
import { PrimaryButton } from 'components/common';
import { useRouter } from 'next/router';

type ResultProps = {
  wordList: string[];
};

const RandomWordResult = ({ wordList }: ResultProps) => {
  const router = useRouter();

  return (
    <>
      <Empty />
      <ResultGrid>
        {wordList.map((word, idx) => {
          return <Word key={idx}>{word}</Word>;
        })}
      </ResultGrid>
    </>
  );
};
const Empty = styled.div`
  height: 100px;
`;

const ResultGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  column-gap: 80px;
  row-gap: 66px;
`;

const Word = styled.div`
  width: 318px;
  height: 114px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 5px solid ${themedPalette.border_1};
  border-radius: 12px;
  font-size: 20px;
`;

const ButtonWrapper = styled.div`
  padding-top: 70px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export { RandomWordResult };
