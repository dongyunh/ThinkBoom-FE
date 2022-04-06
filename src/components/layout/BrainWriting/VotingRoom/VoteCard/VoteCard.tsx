import React, { useState } from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../../../../theme/styleTheme';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { VoteCardModal } from 'components/layout/BrainWriting/VotingRoom/VoteCardModal';
import { Modal } from 'components/common/Modals';

type VoteCardProps = {
  width: number;
  height: number;
  children?: React.ReactChild;
  idea: string;
  commentList: string[];
  isVoted: boolean;
  onClick: () => void;
};

type StyleProps = {
  width: number;
  height: number;
  isVoted?: boolean;
};

const VoteCard = ({
  width,
  height,
  onClick,
  children,
  idea,
  commentList,
  isVoted,
}: VoteCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleVote = () => {};

  const handleOnClick = () => {
    onClick();
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <CardWrapper>
        <StyledCard width={width} height={height} onClick={handleOnClick} isVoted={isVoted}>
          {children}
          <CheckBox>
            <CheckCircleOutlineIcon sx={{ fontSize: 45 }} onClick={handleVote} />
          </CheckBox>
        </StyledCard>
        <AfterCard width={width} height={height} />
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
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  background-color: ${themedPalette.card_bg_normal};
  border: 5px solid ${themedPalette.border_1};
  border-radius: 18px;
  position: relative;
  transition: 0.2s ease-in-out;
  overflow: hidden;

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
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-color: ${themedPalette.card_bg_normal};
  border: 5px solid ${themedPalette.border_1};
  border-radius: 18px;
  z-index: -1;
  left: 8px;
  top: 8px;
`;

const CheckBox = styled.div`
  position: absolute;
  top: 135px;
  left: 260px;
`;

export { VoteCard };
