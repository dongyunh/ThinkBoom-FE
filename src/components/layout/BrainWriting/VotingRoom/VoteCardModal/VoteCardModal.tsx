import React from 'react';
import { VoteModal } from '@components/common/Modals';
import { Button } from '@components/common';
import styled from 'styled-components';
import { themedPalette } from '../../../../../theme/styleTheme';
import { useRouter } from 'next/router';
import { DetailCard } from '../DetailCard';
import CloseIcon from '@mui/icons-material/Close';

interface propsType {
  closeModal: () => void;
}
const VoteCardModal = (props: propsType) => {
  return (
    <VoteModal>
      <>
        <DetailCard width={400} height={630}>
          sdsss
        </DetailCard>
        <CloseIcon
          onClick={props.closeModal}
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
