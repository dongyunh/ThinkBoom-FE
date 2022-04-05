import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../../theme/styleTheme';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { CenterLayout } from '../../common';
import { brainWritingSelector } from '../../../redux/modules/brainWriting/selectors';
import { getTimerData, getIdea } from '@redux/modules/brainWriting';
import { useRouter } from 'next/router';

type CardProps = {
  width: number;
  height: number;
  subject: string | undefined;
  onChange?: () => void;
  onClick: () => void;
};

type StyleProps = {
  width?: number;
  height?: number;
  isFocused?: boolean;
};

const BwComment = ({ width, height, subject, onChange, onClick }: CardProps) => {
  const dispatch = useAppDispatch();
  const [contents, setContents] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const { nickname, BWtimer, viewIdea } = useAppSelector(brainWritingSelector);
  const [isFocused, setIsFocused] = useState(false);
  const handleSendMessage = () => {
    contents;
  };
  const router = useRouter();
  const roomInfo = router.query.roomInfo as string[];
  const BWRoomId = roomInfo[1];

  const [seconds, setSeconds] = useState(BWtimer);

  const onKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      setComment(contents);
    }
  };

  useEffect(() => {
    dispatch(getIdea(BWRoomId));
  }, []);

  const sendcomment = () => {
    setComment(contents);
  };

  return (
    <CenterLayout>
      <Container>
        <Title>코멘트를 입력해주세요</Title>
        <CardWrapper>
          <StyledCard width={width} height={height}>
            <StlyeSubject>{subject}</StlyeSubject>
            <OtherIdea>{viewIdea}</OtherIdea>
            <MyComment>{comment}</MyComment>
            <StyledTextarea isFocused={isFocused}>
              <TextField
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                maxLength={200}
                placeholder="댓글을 입력해주세요."
                onKeyPress={e => onKeyPress(e)}
                onChange={e => setContents(e.target.value)}
              />

              <StyledButton onClick={sendcomment}>입력</StyledButton>
            </StyledTextarea>
          </StyledCard>
        </CardWrapper>
      </Container>
    </CenterLayout>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  align-items: center;
  gap: 20px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

const CardWrapper = styled.div`
  position: relative;
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

const OtherIdea = styled.div``;

const MyComment = styled.div`
  height: 50%;
  width: 82%;
  border-radius: 12px;
  position: relative;
  text-align: center;
  margin: auto;
  font-size: 20px;
  padding: 30px;
  overflow-y: scroll;
`;

const StyledTextarea = styled.div<StyleProps>`
  height: 25%;
  width: 82%;
  background-color: ${themedPalette.component_2};
  border: 5px solid ${props => (props.isFocused ? `#2962ff` : themedPalette.border_1)};
  border-radius: 12px;
  display: flex;
  position: relative;
  align-items: center;
  text-align: center;
  margin: auto;
  font-size: 20px;
`;
const TextField = styled.textarea`
  padding: 10px;
  width: 70%;
  box-sizing: border-box;
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 18px;
  height: 100%;
  resize: none;
`;
const StyledButton = styled.button`
  width: 90px;
  height: 42px;
  position: absolute;
  right: 30px;
  background-color: ${themedPalette.border_1};
  border-radius: 9px;
  border: none;
  color: ${themedPalette.main_text2};
  cursor: pointer;
`;

export { BwComment };
