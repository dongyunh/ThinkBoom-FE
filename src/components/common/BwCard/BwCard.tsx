import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../../theme/styleTheme';
import { CenterLayout, PrimaryButton } from '../../common';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {
  brainWritingSelector,
  updateTimerData,
  postIdea,
  getTimerData,
  getUpdatedTimerData,
} from '@redux/modules/brainWriting';
import { useRouter } from 'next/router';
import useTimer from '@hooks/useTimer';

type CardProps = {
  width: number;
  height: number;
  subject: string | undefined;
  children?: React.ReactChild;
  onClickComplete: () => void;
};
type StyleProps = {
  width: number;
  height: number;
};

const BwCard = ({ width, height, subject, onClickComplete, children }: CardProps) => {
  const dispatch = useAppDispatch();
  const { senderId, bwRoomId, isAdmin, isTimerOver } = useAppSelector(brainWritingSelector);
  const [idea, setIdea] = useState<string>('');
  const router = useRouter();
  const roomInfo = router.query.roomInfo as string[];
  const BWRoomId = roomInfo[1];

  const SendIdea = () => {
    dispatch(postIdea({ senderId, idea, bwRoomid: bwRoomId }));
  };

  useEffect(() => {
    if (isTimerOver) {
      onClickComplete();
    }
  }, [isTimerOver]);

  useTimer({ type: 'brainwriting', roomId: BWRoomId });

  return (
    <CenterLayout>
      <Container>
        <Empty />
        <CardWrapper>
          <StyledCard width={width} height={height}>
            <StlyeSubject>{subject}</StlyeSubject>
            <StyledIdea onChange={e => setIdea(e.target.value)}>{children}</StyledIdea>
            <StyledButton onClick={SendIdea}>작성</StyledButton>
          </StyledCard>
        </CardWrapper>
        <ButtonWrapper>
          {isAdmin ? (
            <PrimaryButton text="완료" disabled={!isAdmin} onClick={onClickComplete} />
          ) : null}
        </ButtonWrapper>
      </Container>
    </CenterLayout>
  );
};

const Empty = styled.div``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
`;

const CardWrapper = styled.div`
  position: relative;
  padding-bottom: 50px;
`;
const ButtonWrapper = styled.div`
  margin: auto;
`;

const StyledCard = styled.div<StyleProps>`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  background-color: ${themedPalette.card_bg_normal};
  border: 5px solid ${themedPalette.border_1};
  border-radius: 18px;
  position: relative;
  transition: 0.2s ease-in-out;
  text-align: center;
  margin: auto;
`;

const StlyeSubject = styled.h3`
  text-align: center;
  font-size: 28px;
`;

const StyledIdea = styled.textarea`
  height: 60%;
  width: 82%;
  border: 5px solid ${themedPalette.border_1};
  border-radius: 12px;
  position: relative;
  text-align: center;
  margin: auto;
  font-size: 20px;
  resize: none;
  padding: 30px;
  outline: none;
  transition: 0.3s ease-in-out;
  :focus {
    border: 5px solid #2962ff;
  }
`;

const StyledButton = styled.button`
  height: 12%;
  width: 82%;
  background-color: ${themedPalette.component_2};
  border: 5px solid ${themedPalette.border_1};
  border-radius: 12px;
  position: relative;
  text-align: center;
  margin: 17px;
  cursor: pointer;
  font-size: 20px;
`;

export { BwCard };
