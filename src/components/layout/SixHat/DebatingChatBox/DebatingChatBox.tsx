import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../../../theme/styleTheme';
import { Message, ChatTextField } from '.';
import { sixHatSelector } from '../../../../redux/modules/sixHat';
import { useAppSelector } from '../../../../redux/hooks';
import { HatImage } from '@components/common';
import HatData from '../../../../mock/hatData';

type DebatingChatBoxProps = {
  onClick: (arg: string) => void;
};

const DebatingChatBox = ({ onClick }: DebatingChatBoxProps) => {
  const { subject, chatHistory, nickname, userList, myHat } = useAppSelector(sixHatSelector);
  const [isShowHatDesc, setIsShowHatDesc] = useState(false);

  const myHatData = useMemo(() => {
    return HatData.filter(data => data.value === myHat)[0];
  }, [myHat]);

  const handleShowDesc = () => {
    setIsShowHatDesc(true);
  };

  const handleHideDesc = () => {
    setIsShowHatDesc(false);
  };

  return (
    <Container>
      <SubjectBox>{subject}</SubjectBox>
      <DownBox>
        <UserListBox>
          <MyHatBox>
            {isShowHatDesc ? (
              <>
                <h3>{myHatData.text}</h3>
                <DescText>{myHatData.desc}</DescText>
              </>
            ) : (
              <HatImage isMe={true} type={myHat} width={90} height={90} />
            )}

            <TouchArea onMouseOver={handleShowDesc} onMouseOut={handleHideDesc} />
          </MyHatBox>
          <UserList>
            {userList.map(user => {
              return (
                <UserProfile key={user.nickname}>
                  {user.hat !== null && (
                    <HatImage isMe={true} type={user.hat} width={20} height={20} />
                  )}
                  <User>{user.nickname}</User>
                </UserProfile>
              );
            })}
          </UserList>
        </UserListBox>
        <ChatViewBox>
          <MessageBox>
            {chatHistory?.map((data, idx) => {
              if (data.hat) {
                return (
                  <Message
                    key={idx}
                    isMe={data.nickname === nickname}
                    message={data.message}
                    nickname={data.nickname}
                    hat={data.hat}
                  />
                );
              }
            })}
          </MessageBox>
          <ChatTextField onClick={onClick} />
        </ChatViewBox>
      </DownBox>
    </Container>
  );
};

const Container = styled.div`
  width: 70vw;
  height: 75vh;
  border: 5px solid ${themedPalette.border_1};
  background-color: ${themedPalette.box_bg};
  border-radius: 18px;
`;

const MyHatBox = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 18px;
  border: 5px solid ${themedPalette.border_1};
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 10px;
`;

const TouchArea = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const DescText = styled.span`
  text-align: center;
`;

const SubjectBox = styled.div`
  width: 100%;
  height: 10vh;
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
  height: 65vh;
  box-sizing: border-box;
  display: flex;
`;

const UserListBox = styled.div`
  width: 15vw;
  height: 99%;
  border-right: 5px solid ${themedPalette.black};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 32px;
`;

const ChatViewBox = styled.div`
  width: 55vw;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 32px 48px 30px 48px;
`;

const UserList = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 10px;
`;

const User = styled.div``;

const MessageBox = styled.div`
  display: flex;
  flex-direction: column-reverse;
  height: 80%;
  overflow-y: scroll;
  box-sizing: border-box;
  margin-bottom: 10px;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

export { DebatingChatBox };

// NOTE : 이 페이지에서 처리해야 할 내용 1.모자선택시 로직 2.랜덤 로직
