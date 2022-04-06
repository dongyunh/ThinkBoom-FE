import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getDetailGallery, selectGallery } from 'redux/modules/gallery';
import { GetServerSideProps } from 'next';
import { Category } from 'redux/modules/gallery/types';
import { RandomWordResult } from 'components/layout/RandomWord';
import { ResultBox as SixHatResult } from 'components/layout/SixHat';
import { CenterLayout } from 'components/common';
import { Result } from 'components/layout/BrainWriting';

type DetailProps = {
  roomInfo: [Category, string];
};

const Detail = ({ roomInfo }: DetailProps) => {
  const dispatch = useAppDispatch();
  const { randomWordDetail, sixHatDetail, brainWritingDetail } = useAppSelector(selectGallery);
  const [category, roomId] = roomInfo;

  useEffect(() => {
    dispatch(getDetailGallery({ category, roomId }));
  }, []);

  const renderComponents = () => {
    if (category === 'randomword') {
      return <RandomWordResult wordList={randomWordDetail} />;
    }
    if (category === 'sixhat') {
      return <SixHatResult subject={sixHatDetail.subject} chatHistory={sixHatDetail.chatHistory} />;
    }
    if (category === 'brainwriting') {
      return <Result brainWritingDetail={brainWritingDetail} />;
    }
  };

  return (
    <CenterLayout>
      <div>{renderComponents()}</div>
    </CenterLayout>
  );
};

export default Detail;

export const getServerSideProps: GetServerSideProps = async context => {
  const { query } = context;
  const { roomInfo } = query;
  return {
    props: {
      roomInfo,
    },
  };
};
