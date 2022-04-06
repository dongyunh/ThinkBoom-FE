import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { CenterLayout } from 'components/common';
import { VoteCard } from 'components/layout/BrainWriting';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { selectGallery, getDetailGallery } from 'redux/modules/gallery';

type ResultProps = {
  bwRoomId: string;
};

const Result = ({ bwRoomId }: ResultProps) => {
  const dispatch = useAppDispatch();
  const { brainWritingDetail } = useAppSelector(selectGallery);

  useEffect(() => {
    dispatch(getDetailGallery({ category: 'brainwriting', roomId: bwRoomId }));
  }, []);

  return (
    <CenterLayout>
      <Container>
        {brainWritingDetail.voteResult.map(data => {
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
