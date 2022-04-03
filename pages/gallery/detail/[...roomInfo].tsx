import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getDetailGallery, selectGallery } from '@redux/modules/gallery';
import { GetServerSideProps } from 'next';
import { Category } from '@redux/modules/gallery/types';
import { RandomWordResult } from '@components/layout/RandomWord';

type DetailProps = {
  roomInfo: [Category, string];
};

const Detail = ({ roomInfo }: DetailProps) => {
  const dispatch = useAppDispatch();
  const { randomWordDetail } = useAppSelector(selectGallery);
  const [category, roomId] = roomInfo;

  useEffect(() => {
    dispatch(getDetailGallery({ category, roomId }));
  }, []);

  const renderComponents = () => {
    if (category === 'randomword') {
      return <RandomWordResult wordList={randomWordDetail} />;
    }
  };

  return (
    <div>
      {category}, {roomId}
    </div>
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
