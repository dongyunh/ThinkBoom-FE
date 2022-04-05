import React from 'react';
import { VoteModal } from '@components/common/Modals';
import { DetailCard } from '../DetailCard';
import CloseIcon from '@mui/icons-material/Close';

type VoteCardModalProps = {
  closeModal: () => void;
  idea: string;
  commentList: string[];
};

const VoteCardModal = ({ closeModal, idea, commentList }: VoteCardModalProps) => {
  return (
    <VoteModal>
      <>
        <DetailCard width={400} height={630}>
          {idea}
        </DetailCard>
        <CloseIcon
          onClick={closeModal}
          sx={{ position: 'absolute', top: 30, left: 340, cursor: 'pointer' }}
        />
      </>
    </VoteModal>
  );
};

export { VoteCardModal };

/**
 * TODO : 1.모든 요소 입력 안되었을 때, 버튼 diabled 처리하기
 */
