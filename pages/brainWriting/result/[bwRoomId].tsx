import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { CenterLayout, PrimaryButton, ResultModal } from 'components/common';
import { VoteCard } from 'components/layout/BrainWriting';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { selectGallery, getDetailGallery } from 'redux/modules/gallery';
import { useRouter } from 'next/router';
import axios from 'axios';

type ResultProps = {
  bwRoomId: string;
};

const Result = ({ bwRoomId }: ResultProps) => {
  const dispatch = useAppDispatch();
  const { brainWritingDetail } = useAppSelector(selectGallery);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    dispatch(getDetailGallery({ category: 'brainwriting', roomId: bwRoomId }));
  }, []);

  const handleComplete = () => {
    setIsOpen(false);
    router.replace('/');
  };

  const handleCancel = () => {
    axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/brainwriting/sharing/${bwRoomId}`);
    router.replace('/');
  };

  return (
    <CenterLayout>
      <>
        <Container>
          {brainWritingDetail?.voteResult?.map(data => {
            return (
              <VoteCard
                key={data.ideaId}
                isWinner={data.isWinner}
                isResult={true}
                idea={data.idea}
                commentList={data.commentList}
              />
            );
          })}
        </Container>
        <PrimaryButton text="완료" onClick={() => setIsOpen(true)} />
        {isOpen && <ResultModal onClickBtn1={handleCancel} onClickBtn2={handleComplete} />}
      </>
    </CenterLayout>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
`;

export default Result;

export const getServerSideProps: GetServerSideProps = async context => {
  const { query } = context;
  const { bwRoomId } = query;
  return {
    props: {
      bwRoomId,
    },
  };
};
