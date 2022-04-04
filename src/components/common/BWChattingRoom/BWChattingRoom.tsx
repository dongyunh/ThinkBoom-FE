import React from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../../theme';
import CloseIcon from '@mui/icons-material/Close';
import { Message } from '../ChattingRoom/Message';
import { BWChatTextField } from '../BWChattingRoom/BWChatTextField';
import { ChatHistoryType } from '@redux/modules/brainWriting/types';

type BWChattingRoomType = {
  chatHistory?: ChatHistoryType;
  myNickname: string | null;
  onClick: () => void;
  sendMessage: (message: string) => void;
};

const BWChattingRoom = ({ chatHistory, myNickname, onClick, sendMessage }: BWChattingRoomType) => {
  const handleOnClick = () => {
    if (!onClick) return;
    onClick();
  };


  return (
    <Container>
      <ChattingHeader>
        <Empty />
        <IconBox onClick={handleOnClick}>
          <CloseIcon style={{ color: 'white' }} />
        </IconBox>
      </ChattingHeader>
      <MessageBox>
        {chatHistory?.map((data, idx) => {
          return (
            <Message
              isMe={myNickname == data.nickname}
              message={data.message}
              nickname={data.nickname}
              key={idx}
            />
          );
        })}
      </MessageBox>
      <BWChatTextField BWsendMessage={sendMessage} />
    </Container>
  );
};

const Container = styled.div`
  width: 360px;
  height: 600px;
  border: 5px solid ${themedPalette.border_1};
  border-radius: 5px;
  background-color: ${themedPalette.bg_page1};
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

const ChattingHeader = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Empty = styled.div``;

const IconBox = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${themedPalette.black};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const MessageBox = styled.div`
  display: flex;
  flex-direction: column-reverse;
  height: 480px;
  overflow-y: scroll;
  margin-bottom: 10px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export { BWChattingRoom };
