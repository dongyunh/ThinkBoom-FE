import React from 'react';
import { CenterLayout, PrimaryButton } from 'components/common';
import { VoteCard } from 'components/layout/BrainWriting';
import styled from 'styled-components';
import { BrainWritingDataType } from 'redux/modules/gallery/types';
import { useRouter } from 'next/router';

type ResultProps = {
  brainWritingDetail: BrainWritingDataType;
  isGallery?: boolean;
  onClick?: () => void;
};

const Result = ({ brainWritingDetail, onClick, isGallery = false }: ResultProps) => {
  console.log(brainWritingDetail);
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  return (
    <CenterLayout>
      <>
        <Title>주제 : {brainWritingDetail.subject}</Title>
        <Container>
          {brainWritingDetail?.voteResult?.map((data, idx) => {
            return (
              <VoteCard
                key={idx}
                isWinner={data.isWinner}
                isResult={true}
                idea={data.idea}
                commentList={data.commentList}
              />
            );
          })}
        </Container>
        <PrimaryButton
          text={isGallery ? '뒤로가기' : '완료'}
          onClick={isGallery ? handleGoBack : onClick}
        />
      </>
    </CenterLayout>
  );
};

const Title = styled.div`
  font-size: 40px;
  font-weight: bold;
  padding-bottom: 30px;
`;

const Container = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
`;

export { Result };
