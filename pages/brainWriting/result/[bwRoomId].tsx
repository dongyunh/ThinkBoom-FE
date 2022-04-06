import React from 'react';
import { CenterLayout } from 'components/common';
import { VoteCard } from 'components/layout/BrainWriting';
import styled from 'styled-components';
import { useAppSelector } from 'redux/hooks';
import { selectGallery } from 'redux/modules/gallery';

const Result = () => {
  const { brainWritingDetail } = useAppSelector(selectGallery);

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
