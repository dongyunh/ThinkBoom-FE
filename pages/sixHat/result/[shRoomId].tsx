import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { ResultBox } from '../../../src/components/layout/SixHat';
import { CenterLayout, PrimaryButton } from '@components/common';
import { ResultModal } from '@components/common/Modals';
import { useRouter } from 'next/router';
import axios from 'axios';
import { getDetailGallery } from '@redux/modules/gallery';
import { useAppDispatch } from '@redux/hooks';
import { DetailArgType } from '@redux/modules/gallery/types';

type ResultProps = {
  shRoomId: string;
};

const Result = ({ shRoomId }: ResultProps) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    dispatch(getDetailGallery({ category: 'sixhat', roomId: shRoomId }));
  }, []);

  const handleComplete = () => {
    setIsOpen(false);
    router.replace('/');
  };

  const handleCancel = () => {
    axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/sixHat/sharing/${shRoomId}`);
    router.replace('/');
  };

  return (
    <CenterLayout>
      <>
        <ResultBox />
        <PrimaryButton text="완료" onClick={() => setIsOpen(true)} />
        {isOpen && <ResultModal onClickBtn1={handleCancel} onClickBtn2={handleComplete} />}
      </>
    </CenterLayout>
  );
};

export default Result;

export const getServerSideProps: GetServerSideProps = async context => {
  const { query } = context;
  const { shRoomId } = query;
  return {
    props: {
      shRoomId,
    },
  };
};
