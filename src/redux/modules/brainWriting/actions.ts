import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useAppDispatch } from '@redux/hooks';
import { ChatData, BWUserData, BWUserCount, BWUserList } from './types';

type GetNicknameArgType = {
  bwRoomId: string;
  nickname: string;
};

type TestType = {
  shareRoomId: string;
  senderId: number | null;
};

type PostIdeaArgType = {
  bwRoomid: string | null;
  senderId: number | null;
  idea: string;
};

const prefix = 'brainWriting';

export const updateStartCurrentPageBW = createAction<number>(`${prefix}/UPDATE_START_CURRENT_PAGE`);
export const updateCurrentPageBW = createAction<number>(`${prefix}/UPDATE_CURRENT_PAGE`);

export const updateAdminState = createAction<boolean>(`${prefix}/UPDATE_ADMIN_STATE`);
export const getSubjectBW = createAction<string>(`${prefix}/GET_SUBJECT`);
export const getRoomIdBW = createAction<string>(`${prefix}/GET_ROOMID`);
export const getTimerBW = createAction<number | null>(`${prefix}/GET_TIMER`);
export const getMessagesBW = createAction<ChatData>(`${prefix}/GET_MESSAGES`);

export const getUserListBW = createAction<BWUserList>(`${prefix}/GET_USER_LIST`);
export const changeIsSubmitState = createAction<boolean>(`${prefix}/CHANGE_IS_SUBMIT_STATE`);

export const clearChatHistory = createAction(`${prefix}/CLEAR_CHAT_HISTORY`);
export const getUserCount = createAction<BWUserCount>(`${prefix}/GET_TOTAL_USER_COUNT`);

export const getNickname = createAsyncThunk(
  `${prefix}/GET_NICKNAME`,
  async ({ bwRoomId, nickname }: GetNicknameArgType) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/brainwriting/user/nickname/${bwRoomId}`,
      {
        nickname: nickname,
      },
    );
    return response.data;
  },
);

export const ideaCardCreate = createAsyncThunk(
  `${prefix}/GET_TIMER_DATA`,
  async ({ shareRoomId, senderId }: TestType) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api//create/${shareRoomId}`,
      {
        userId: senderId,
      },
    );
  },
);
export const getTimerData = createAsyncThunk(
  `${prefix}/GET_TIMER_DATA`,
  async (bwRoomId: string | null) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/brainwriting/timer/${bwRoomId}`,
    );

    return response;
  },
);

export const updateTimerData = createAction<number | null>(`${prefix}/UPDATE_TIMER_DATA`);

export const requsetComment = createAsyncThunk(
  `${prefix}/GET_REQUEST_COMMENT`,
  async (bwRoomId: string | null) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api//${bwRoomId}`);
    return response;
  },
);
export const postIdea = createAsyncThunk(
  `${prefix}/POST_IDEA`,
  async ({ senderId, idea, bwRoomid }: PostIdeaArgType) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/brainwriting/idea/${bwRoomid}`,
      {
        userId: senderId,
        idea: idea,
      },
    );
    return response.data;
  },
);
