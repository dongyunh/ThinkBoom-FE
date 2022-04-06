import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import {
  InteractivePage,
  WaitingRoom,
  ShareIcon,
  ChatIcon,
  TutorialIcon,
} from '../../../src/components/common';
import { SelectHat, DebatingRoom } from '../../../src/components/layout/SixHat';
import { useAppDispatch, useAppSelector } from '../../../src/redux/hooks';
import {
  updateCurrentPage,
  changeIsSubmitState,
  sixHatSelector,
  getNickname,
  getMyHat,
  clearChatHistory,
} from '../../../src/redux/modules/sixHat';
import { NicknameModal, LimitModal, RoutingAlertModal } from '../../../src/components/common';
import { ChattingRoom } from 'components/common';
import styled from 'styled-components';
import useSocketHook from '../../../src/hooks/useSocketHook';
import { HatType, UserList } from 'redux/modules/sixHat/types';
import { selectPermit, setIsMessageArrived } from 'redux/modules/permit';
import { ToastContainer } from 'react-toastify';
import copyUrlHelper from 'utils/copyUrlHelper';

import 'react-toastify/dist/ReactToastify.css';

type SettingPageProps = {
  roomInfo: string[];
};

let ConnectedSocket: any;

const SettingPage = ({ roomInfo }: SettingPageProps) => {
  const dispatch = useAppDispatch();
  const { currentPage, nickname, chatHistory, senderId, userCount, myHat } =
    useAppSelector(sixHatSelector);
  const { isRoutingModalOpen } = useAppSelector(selectPermit);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFull, setIsFull] = useState(0);
  const [roomTitle, roomId] = roomInfo;

  const HandleSocket = useSocketHook('sixhat');

  useEffect(() => {
    if (userCount.totalUser !== 0) {
      setIsFull(userCount.currentUser / userCount.totalUser);
    }
    return () => {
      setIsFull(0);
    };
  }, [userCount]);

  useEffect(() => {
    if (nickname) {
      ConnectedSocket = new HandleSocket(`${process.env.NEXT_PUBLIC_API_URL}/websocket`);
      ConnectedSocket.connectSH(senderId, roomId);
    }
  }, [nickname]);

  useEffect(() => {
    window.onbeforeunload = function () {
      ConnectedSocket.disConnect('SH');
    };

    return () => {
      window.onbeforeunload = null;
      ConnectedSocket.disConnect('SH');
    };
  }, []);

  const sendHatData = (hat: HatType) => {
    ConnectedSocket.sendHatData(nickname, hat);
    dispatch(getMyHat(hat));
  };

  const sendMessage = (message: string) => {
    ConnectedSocket.sendMessage(nickname, message);
  };

  const handelSendDebatingMessage = (message: string) => {
    ConnectedSocket.sendMessageDB(nickname, message, myHat);
  };

  const handleNextPage = (pageNum: number) => {
    ConnectedSocket.sendCurrentPage(pageNum);
  };

  const handleSubmitSubject = (_subject?: string) => {
    ConnectedSocket.submitSubject(_subject);
    dispatch(changeIsSubmitState(true));
  };

  const handleUpdateNickname = async (enteredName: string) => {
    dispatch(getNickname({ shRoomId: roomId, nickname: enteredName }));
  };

  const handleSendRandomHat = (userHatList: UserList) => {
    ConnectedSocket.sendRandomHatData(userHatList);
  };

  const handleCompleteSelect = () => {
    handleNextPage(2);
    dispatch(clearChatHistory());
  };

  const handleChatOpen = () => {
    setIsChatOpen(!isChatOpen);
    dispatch(setIsMessageArrived(false));
  };

  const handleCompleteDebatingPage = () => {
    handleNextPage(3);
  };

  const pages = [
    {
      component: (
        <WaitingRoom
          onClickSubmit={handleSubmitSubject}
          onClickComplete={() => handleNextPage(1)}
        />
      ),
    },
    {
      component: (
        <SelectHat
          onClick={sendHatData}
          onClickComplete={handleCompleteSelect}
          onClickRandom={handleSendRandomHat}
        />
      ),
    },
    {
      component: (
        <DebatingRoom
          onClick={handelSendDebatingMessage}
          onClickComplete={handleCompleteDebatingPage}
        />
      ),
    },
  ];

  return (
    <>
      <ToastContainer position="bottom-left" autoClose={3000} theme="dark" />
      <InteractivePage pages={pages} currentPage={currentPage} />
      {!nickname && isFull <= 1 && (
        <NicknameModal title={roomTitle} onClick={handleUpdateNickname} />
      )}
      {isFull > 1 && <LimitModal />}
      {isRoutingModalOpen && <RoutingAlertModal />}
      <ShareIconWrapper onClick={copyUrlHelper}>
        <ShareIcon />
      </ShareIconWrapper>
      {currentPage !== 2 && (
        <ChatWrapper onClick={handleChatOpen}>
          <ChatIcon isChatOpen={isChatOpen} />
        </ChatWrapper>
      )}
      <TutorialIconWrapper>
        <TutorialIcon type="sixHat" />
      </TutorialIconWrapper>

      {isChatOpen && currentPage !== 2 && (
        <ChattingContainer>
          <ChattingRoom
            myNickname={nickname}
            chatHistory={chatHistory}
            onClick={handleChatOpen}
            sendMessage={sendMessage}
          />
        </ChattingContainer>
      )}
    </>
  );
};

export default SettingPage;

const ChatWrapper = styled.div`
  position: fixed;
  right: 210px;
  bottom: 70px;
  cursor: pointer;
`;

const ShareIconWrapper = styled.div`
  position: fixed;
  right: 140px;
  bottom: 70px;
  cursor: pointer;
`;

const TutorialIconWrapper = styled.div`
  position: fixed;
  right: 70px;
  bottom: 70px;
  cursor: pointer;
`;

const ChattingContainer = styled.div`
  position: fixed;
  right: 70px;
  bottom: 130px;
  z-index: 9999;
`;

export const getServerSideProps: GetServerSideProps = async context => {
  const { query } = context;
  const { roomInfo } = query;
  return {
    props: {
      roomInfo,
    },
  };
};
