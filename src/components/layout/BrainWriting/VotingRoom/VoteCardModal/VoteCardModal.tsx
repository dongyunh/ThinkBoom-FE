import React, { useState } from 'react';
import { VoteModal } from './VoteModal';
import styled from 'styled-components';
import { themedPalette } from 'theme/styleTheme';
import { Card } from 'components/common';
import CloseIcon from '@mui/icons-material/Close';

type VoteCardModalProps = {
  idea: string;
  commentList: string[];
  onClick: () => void;
};

const VoteCardModal = ({ idea, commentList, onClick }: VoteCardModalProps) => {
  return (
    <VoteModal>
      <Card width={400} height={600} isPointer={false}>
        <Container>
          <CloseWrapper>
            <CloseIcon sx={{ cursor: 'pointer' }} onClick={onClick} />
          </CloseWrapper>
          <Idea>{idea}</Idea>
          <CommentWrapper>
            {commentList?.map((comment, idx) => {
              return <Comment key={idx}>{comment}</Comment>;
            })}
          </CommentWrapper>
        </Container>
      </Card>
    </VoteModal>
  );
};
const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 20px;
  box-sizing: border-box;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const CloseWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const Idea = styled.div`
  padding: 10px 0px 30px 0px;
  font-size: 18px;
  font-weight: bold;
`;

const Comment = styled.div`
  min-height: 100px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid ${themedPalette.border_1};
  border-radius: 18px;
  padding: 10px;
`;

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

export { VoteCardModal };

/**
 * TODO : 1.모든 요소 입력 안되었을 때, 버튼 diabled 처리하기
 */
