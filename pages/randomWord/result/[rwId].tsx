import React, { useState, useEffect } from 'react';
import { ResultModal } from '../../../src/components/common/Modals';
import { GetServerSideProps } from 'next';
import { CenterLayout, PrimaryButton } from 'components/common';
import styled from 'styled-components';
import { themedPalette } from '../../../src/theme/styleTheme';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { selectRandomWord, getResultWord } from 'redux/modules/randomWord';
import axios from 'axios';
import { useRouter } from 'next/router';
import { RandomWordResult } from 'components/layout/RandomWord';

type ResultProps = {
  rwId: string;
};

const Result = ({ rwId }: ResultProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { pickedWordList } = useAppSelector(selectRandomWord);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleConfirm = () => {
    setIsOpen(false);
    router.replace('/');
  };

  const handleDontShare = () => {
    axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/randomWord/share/${rwId}`);
    router.replace('/');
  };

  useEffect(() => {
    dispatch(getResultWord(rwId));
  }, []);

  return (
    <CenterLayout>
      <>
        <Title>선택된 단어</Title>
        <RandomWordResult wordList={pickedWordList} />
        <Empty />
        <PrimaryButton text="완료" onClick={() => setIsOpen(true)} />
        {isOpen && <ResultModal onClickBtn1={handleDontShare} onClickBtn2={handleConfirm} />}
      </>
    </CenterLayout>
  );
};

const Title = styled.h1`
  color: ${themedPalette.main_text1};
`;

const Empty = styled.div`
  height: 50px;
`;

export default Result;

export const getServerSideProps: GetServerSideProps = async context => {
  const { query } = context;
  const { rwId } = query;
  return {
    props: {
      rwId,
    },
  };
};
