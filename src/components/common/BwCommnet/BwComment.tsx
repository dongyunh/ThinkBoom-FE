import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../../theme/styleTheme';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { CenterLayout } from '..';
import { brainWritingSelector } from '../../../redux/modules/brainWriting/selectors';
import { timerData } from '../../../redux/modules/brainWriting/actions';
import { Timer } from '../Timer';
type CardProps = {
  width: number;
  height: number;
  subject: string | undefined;
  onChange?: () => void;
  onClick: () => void;
};
type StyleProps = {
  width: number;
  height: number;
};

const BwComment = ({ width, height, subject, onChange, onClick }: CardProps) => {
  const dispatch = useAppDispatch();
  const [contents, setContents] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const { nickname, BWtimer } = useAppSelector(brainWritingSelector);
  const handleSendMessage = () => {
    contents;
  };
  const shareRoomId = window.location.pathname.split('/')[4];
  const [seconds, setSeconds] = useState(BWtimer);
  useEffect(() => {
    if (nickname) {
      dispatch(timerData(shareRoomId));
    }
  }, []);
  //BWtimer= res.timerData

  useEffect(() => {
    if (seconds == null) {
      setSeconds(BWtimer);
    }
  }, [BWtimer]);

  useEffect(() => {
    if (seconds !== null) {
      const interval = setInterval(() => {
        if (seconds === 0) clearInterval(interval);
        else setSeconds(seconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [seconds]);

  const onKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      setComment(contents);
    }
  };

  const sendcomment = () => {
    setComment(contents);
    // dispatch(sendCommentData(cont))
  };

  return (
    <CenterLayout>
      <>
        <h3>코멘트를 입력해주세요</h3>
        <CardWrapper>
          <StyledCard width={width} height={height}>
            <StlyeSubject>{subject}</StlyeSubject>
            <div></div>
            <StyledIdea onClick={onClick}>{comment}</StyledIdea>
            <StyledTextarea>
              <TextField
                maxLength={200}
                placeholder="댓글을 입력해주세요."
                onKeyPress={e => onKeyPress(e)}
                onChange={e => setContents(e.target.value)}
              />

              <StyledButton onClick={sendcomment}>입력</StyledButton>
            </StyledTextarea>
          </StyledCard>
        </CardWrapper>
      </>
    </CenterLayout>
  );
};

const CardWrapper = styled.div`
  position: relative;
  margin-top: 150px;
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

const StyledIdea = styled.div`
  height: 50%;
  width: 82%;
  /* border: 5px solid ${themedPalette.border_1}; */
  border-radius: 12px;
  position: relative;
  text-align: center;
  margin: auto;
  font-size: 20px;
  padding: 30px;
`;

const StyledTextarea = styled.div`
  height: 25%;
  width: 82%;
  background-color: ${themedPalette.component_2};
  border: 5px solid ${themedPalette.border_1};
  border-radius: 12px;
  display: flex;
  position: relative;
  align-items: center;
  text-align: center;
  margin: auto;
  font-size: 20px;
`;
const TextField = styled.textarea`
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
