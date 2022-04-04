import React, { useEffect } from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../../../theme/styleTheme';
import { Message } from '../DebatingChatBox';
import { ChatData } from '@redux/modules/gallery/types';

type ResultBoxProps = {
  subject: string;
  chatHistory: ChatData[];
};

const ResultBox = ({ subject, chatHistory }: ResultBoxProps) => {
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
  background-color: ${themedPalette.box_bg};
  border-radius: 18px;
  margin-bottom: 30px;
`;

const SubjectBox = styled.div`
  width: 100%;
  height: 72px;
  background-color: ${themedPalette.box_subject};
  color: ${themedPalette.main_text2};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  position: relative;
  border-radius: 13px 13px 0 0;
  border-bottom: 5px solid ${themedPalette.border_1};
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
