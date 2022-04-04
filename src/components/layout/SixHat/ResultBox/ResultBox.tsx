import React, { useEffect } from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../../../theme/styleTheme';
import { Message } from '../DebatingChatBox';
import { sixHatSelector } from '../../../../redux/modules/sixHat';
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';

const ResultBox = ({}) => {
  const { subject, chatHistory, nickname } = useAppSelector(sixHatSelector);

  return (
    <Container>
      <SubjectBox>{subject}</SubjectBox>
      <DownBox>
        <ChatViewBox>
          <MessageBox>
            {chatHistory?.map((data, idx) => {
              if (data.hat) {
                return (
                  <Message
                    key={idx}
                    isMe={false}
                    message={data.message}
                    nickname={data.nickname}
                    hat={data.hat}
                  />
                );
              }
            })}
          </MessageBox>
        </ChatViewBox>
      </DownBox>
    </Container>
  );
};

const Container = styled.div`
  width: 800px;
  height: 520px;
  border: 5px solid ${themedPalette.border_1};
  border-radius: 18px;
  margin-bottom: 30px;
`;

const SubjectBox = styled.div`
  width: 100%;
  height: 72px;
  background-color: ${themedPalette.black};
  color: ${themedPalette.main_text2};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  position: relative;
`;

const DownBox = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
`;

const ChatViewBox = styled.div`
  width: 832px;
  height: 512px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 32px 48px 30px 48px;
`;

const MessageBox = styled.div`
  display: flex;
  flex-direction: column-reverse;
  height: 380px;
  overflow-y: scroll;
  margin-bottom: 10px;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

export { ResultBox };
