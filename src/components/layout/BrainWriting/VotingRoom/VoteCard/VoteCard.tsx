import React, { useState } from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../../../../theme/styleTheme';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { VoteCardModal } from 'components/layout/BrainWriting/VotingRoom/VoteCardModal';
import { Modal } from 'components/common/Modals';
import Image from 'next/image';
import GoldMedal from '/public/asset/goldMedal.png';

type VoteCardProps = {
  idea: string;
  commentList: string[];
  isVoted?: boolean;
  isWinner?: boolean;
  isResult?: boolean;
  onClick?: () => void;
};

type StyleProps = {
  isVoted?: boolean;
};

const VoteCard = ({ onClick, idea, commentList, isVoted, isWinner, isResult }: VoteCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOnClick = () => {
    if (!onClick) return;
    onClick();
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <CardWrapper>
        <StyledCard onClick={handleOnClick} isVoted={isVoted}>
          {idea}
          {!isResult && !isWinner && (
            <CheckCircleOutlineIcon
              sx={{ fontSize: 45, position: 'absolute', bottom: '5px', right: '10px' }}
            />
          )}
          {isWinner && (
            <ImageWrapper>
              <Image src={GoldMedal} width={50} height={50} />
            </ImageWrapper>
          )}
        </StyledCard>
        <AfterCard />
      </CardWrapper>
      {isModalOpen && <VoteCardModal idea={idea} commentList={commentList} onClick={closeModal} />}
    </>
  );
};

const CardWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

const StyledCard = styled.div<StyleProps>`
  height: 200px;
  width: 330px;
  background-color: ${themedPalette.card_bg_normal};
  border: 5px solid ${themedPalette.border_1};
  border-radius: 18px;
  position: relative;
  transition: 0.2s ease-in-out;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    transform: translate(8px, 8px);
    background-color: #e6e6e6;
  }

  ${props =>
    props.isVoted &&
    `
    transform: translate(8px, 8px);
    background-color: #e6e6e6;
  `}
`;

const AfterCard = styled.div<StyleProps>`
  position: absolute;
  height: 200px;
  width: 330px;
  background-color: ${themedPalette.card_bg_normal};
  border: 5px solid ${themedPalette.border_1};
  border-radius: 18px;
  z-index: -1;
  left: 8px;
  top: 8px;
`;

const ImageWrapper = styled.div`
  position: absolute;
  bottom: 5px;
  right: 10px;
`;

export { VoteCard };
