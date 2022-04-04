import React, { useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  getMessages,
  getUserHatInfo,
  getUserList,
  sixHatSelector,
  getRandomHatList,
  getSubjectSH,
  updateCurrentPage,
} from '../redux/modules/sixHat';
import { setIsMessageArrived } from '@redux/modules/permit';
import { getUserCount } from '../redux/modules/CountUser';
import {
  getSubjectBW,
  getMessagesBW,
  getUserListBW,
  updateCurrentPageBW,
} from '../redux/modules/brainWriting';

import mixHatsHelper from '@utils/mixHatsHelper';
import { toast } from 'react-toastify';

import { UserList, UserData, HatType } from '@redux/modules/sixHat/types';
import { BWUserList, BWUserData } from '@redux/modules/brainWriting/types';
export type SixHatResponseData = {
  type: 'ENTER' | 'TALK' | 'HAT' | 'QUIT' | 'SUBJECT' | 'RANDOMHAT' | 'DEBATING' | 'NEXTPAGE';
  roomId: string | null;
  sender: string;
  senderId: number | null;
  hat: HatType;
  message: string | null;
  randomHat: UserList;
  subject: string;
  totalUser: number;
  currentUser: number;
  currentPage: number;
  userList: UserList;
};

export type SixHatSendData = {
  type: 'ENTER' | 'TALK' | 'HAT' | 'QUIT' | 'SUBJECT' | 'RANDOMHAT' | 'DEBATING' | 'NEXTPAGE';
  roomId: string | null;
  sender: string | null;
  senderId: number | null;
  hat: HatType | null;
  message: string | null;
  randomHat?: UserList;
  subject?: string;
  currentPage?: number;
};

export type BrainWritingResponseData = {
  type: 'ENTER' | 'TALK' | 'QUIT' | 'SUBJECT' | 'NEXTPAGE';
  roomId: string | null;
  sender: string | null;
  senderId: number | null;
  message: string | null;
  subject: string;
  currentPage: number;
  totalUser: number;
  currentUser: number;
  BWUserList: BWUserList;
  // createdAt: string | null;
};

export type BrainWritingSendData = {
  type: 'ENTER' | 'TALK' | 'QUIT' | 'SUBJECT' | 'NEXTPAGE';
  roomId: string | null;
  sender: string | null;
  senderId: number | null;
  message: string | null;
  subject?: string;
  currentPage?: number;
};

export default function useSocketHook(type: 'sixhat' | 'brainwriting') {
  const dispatch = useAppDispatch();

  const _api = type == 'sixhat' ? '/subSH/api/sixHat/rooms/' : '/sub/api/brainWriting/rooms/';
  const _messageApi =
    type == 'sixhat' ? '/pubSH/api/sixHat/chat/message' : '/pub/api/brainWriting/chat/message';

  class HandleSocket {
    SockJs;
    StompClient: Stomp.Client;
    _roomId: string | null;
    _senderId: number | null;

    constructor(url: string) {
      this.SockJs = new SockJS(url);
      this.StompClient = Stomp.over(this.SockJs);
      this._roomId = null;
      this._senderId = null;
    }
    connectBW(senderId: number | null, roomId: string) {
      this._senderId = senderId;
      this._roomId = roomId;
      console.log(senderId, roomId);

      this.StompClient.connect({ senderId: this._senderId }, () => {
        this.StompClient.subscribe(
          `/sub/api/brainwriting/rooms/${roomId}`,
          data => {
            const response: BrainWritingResponseData = JSON.parse(
              data.body,
            ) as BrainWritingResponseData;

            if (response.type === 'ENTER') {
              const BWUserCount = {
                totalUser: response.totalUser,
                currentUser: response.currentUser,
              };

              dispatch(getUserListBW(response.BWUserList));
              dispatch(getUserCount(BWUserCount));
            }
            if (response.type === 'TALK') {
              const newMessage = {
                nickname: response.sender,
                message: response.message,
              };
              dispatch(getMessagesBW(newMessage));
              dispatch(setIsMessageArrived(true));
              toast.info('메시지가 도착했습니다');
            }

            if (response.type === 'SUBJECT') {
              console.log('되돌아온 주제', response.subject);
              dispatch(getSubjectBW(response.subject));
              toast.info('주제가 공유되었습니다');
            }
            if (response.type === 'NEXTPAGE') {
              dispatch(updateCurrentPageBW(response.currentPage));
            }
          },
          { senderId: this._senderId, category: 'BW' },
        );
      });
    }

    connectSH(senderId: number | null, roomId: string) {
      this._senderId = senderId;
      this._roomId = roomId;

      this.StompClient.connect({ senderId: this._senderId }, () => {
        this.StompClient.subscribe(
          `/subSH/api/sixHat/rooms/${roomId}`,
          data => {
            const response: SixHatResponseData = JSON.parse(data.body) as SixHatResponseData;

            if (response.type === 'ENTER') {
              const userCount = {
                totalUser: response.totalUser,
                currentUser: response.currentUser,
              };
              console.log(response);
              console.log(response.totalUser, 'total유저');
              console.log(response.currentUser, 'current유저');
              dispatch(getUserList(response.userList));
              dispatch(getUserCount(userCount));
            }

            if (response.type === 'QUIT') {
              const userCount = {
                totalUser: response.totalUser,
                currentUser: response.currentUser,
              };
              dispatch(getUserCount(userCount));
            }

            if (response.type === 'TALK') {
              const newMessage = {
                nickname: response.sender,
                message: response.message,
              };
              dispatch(getMessages(newMessage));
              dispatch(setIsMessageArrived(true));
            }

            if (response.type === 'DEBATING') {
              const newMessage = {
                nickname: response.sender,
                message: response.message,
                hat: response.hat,
              };
              dispatch(getMessages(newMessage));
            }

            if (response.type === 'SUBJECT') {
              dispatch(getSubjectSH(response.subject));
              toast.info('주제가 공유되었습니다');
            }

            if (response.type === 'HAT') {
              const userInfo: UserData = {
                nickname: response.sender,
                hat: response.hat,
              };
              dispatch(getUserHatInfo(userInfo));
            }

            if (response.type === 'RANDOMHAT') {
              dispatch(getRandomHatList(response.randomHat));
            }

            if (response.type === 'NEXTPAGE') {
              dispatch(updateCurrentPage(response.currentPage));
            }
          },
          { senderId: this._senderId, category: 'SH' },
        );
      });
    }

    disConnect() {
      if (this.StompClient) {
        this.StompClient.disconnect(() => {}, {
          senderId: this._senderId,
          category: 'SH',
        });
      }
      if (this.StompClient) {
        this.StompClient.disconnect(() => {}, {
          senderId: this._senderId,
          category: 'BW',
        });
      }
    }

    // 웹소켓이 연결될 때 까지 실행하는 함수
    waitForConnection = (ws: any, callback: any) => {
      setTimeout(() => {
        if (ws.ws.readyState === 1) {
          callback();
        } else {
          this.waitForConnection(ws, callback);
        }
      }, 0.1);
    };

    send = (data: SixHatSendData) => {
      this.waitForConnection(this.StompClient, () => {
        this.StompClient.debug = () => {};
        this.StompClient.send(
          '/pubSH/api/sixHat/chat/message',
          { senderId: this._senderId },
          JSON.stringify(data),
        );
      });
    };

    sendMessage = (sender: string, message: string) => {
      try {
        // send할 데이터
        const data: SixHatSendData = {
          type: 'TALK',
          roomId: this._roomId,
          sender: sender,
          senderId: this._senderId,
          hat: null,
          message: message,
        };
        this.send(data);
      } catch (e) {
        console.log('message 소켓 함수 에러', e);
      }
    };

    sendMessageDB = (sender: string, message: string, myHat: HatType) => {
      try {
        // send할 데이터
        const data: SixHatSendData = {
          type: 'DEBATING',
          roomId: this._roomId,
          sender: sender,
          senderId: this._senderId,
          hat: myHat,
          message: message,
        };
        this.send(data);
      } catch (e) {
        console.log('message 소켓 함수 에러', e);
      }
    };

    sendHatData = (sender: string | null, hat: HatType) => {
      try {
        // send할 데이터
        const data: SixHatSendData = {
          type: 'HAT',
          roomId: this._roomId,
          sender: sender,
          senderId: this._senderId,
          hat: hat,
          message: null,
        };
        this.send(data);
      } catch (e) {
        console.log('message 소켓 함수 에러', e);
      }
    };

    sendRandomHatData = (userHatList: UserList) => {
      try {
        // send할 데이터
        const data: SixHatSendData = {
          type: 'RANDOMHAT',
          roomId: this._roomId,
          sender: null,
          senderId: this._senderId,
          hat: null,
          message: null,
          randomHat: mixHatsHelper(userHatList),
        };
        this.send(data);
      } catch (e) {
        console.log('message 소켓 함수 에러', e);
      }
    };

    submitSubject = (subject: string) => {
      try {
        // send할 데이터
        const data: SixHatSendData = {
          type: 'SUBJECT',
          roomId: this._roomId,
          sender: null,
          senderId: this._senderId,
          hat: null,
          message: null,
          subject: subject,
        };
        this.send(data);
      } catch (e) {
        console.log('message 소켓 함수 에러', e);
      }
    };

    sendCurrentPage = (pageNum: number) => {
      try {
        // send할 데이터
        const data: SixHatSendData = {
          type: 'NEXTPAGE',
          roomId: this._roomId,
          sender: null,
          senderId: this._senderId,
          hat: null,
          message: null,
          currentPage: pageNum,
        };
        this.send(data);
      } catch (e) {
        console.log('message 소켓 함수 에러', e);
      }
    };
    //BW
    BWsend = (data: BrainWritingSendData) => {
      this.waitForConnection(this.StompClient, () => {
        this.StompClient.debug = () => {};
        this.StompClient.send(
          '/pub/api/brainwriting/chat/message',
          { senderId: this._senderId },
          JSON.stringify(data),
        );
        console.log(this._senderId);
      });
    };
    BWsendMessage = (sender: string, message: string) => {
      try {
        // send할 데이터
        const data: BrainWritingSendData = {
          type: 'TALK',
          roomId: this._roomId,
          sender: sender,
          senderId: this._senderId,
          message: message,
        };
        this.BWsend(data);
      } catch (e) {
        console.log('message 소켓 함수 에러', e);
      }
    };
    BWsubmitSubject = (subject: string) => {
      try {
        // send할 데이터
        const data: BrainWritingSendData = {
          type: 'SUBJECT',
          roomId: this._roomId,
          sender: null,
          senderId: this._senderId,
          subject: subject,
          message: null,
        };
        this.BWsend(data);
      } catch (e) {
        console.log('message 소켓 함수 에러', e);
      }
    };
    BWsendCurrentPage = (pageNum: number) => {
      try {
        // send할 데이터
        const data: BrainWritingSendData = {
          type: 'NEXTPAGE',
          roomId: this._roomId,
          sender: null,
          senderId: this._senderId,
          message: null,
          currentPage: pageNum,
        };
        this.BWsend(data);
      } catch (e) {
        console.log('message 소켓 함수 에러', e);
      }
    };
  }

  return HandleSocket;
}
function userData(userData: any): any {
  throw new Error('Function not implemented.');
}
