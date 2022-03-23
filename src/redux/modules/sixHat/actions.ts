import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ChatData, UserData, HatType } from './types';
import axios from 'axios';
type GetNicknameArgType = {
  shRoomId: string;
  nickname: string;
};

const prefix = 'sixHat';

export const updateCurrentPage = createAction<number>(`${prefix}/UPDATE_CURRENT_PAGE`);
export const updateAdminState = createAction<boolean>(`${prefix}/UPDATE_ADMIN_STATE`);
export const changeIsSubmitState = createAction<boolean>(`${prefix}/CHANGE_IS_SUBMIT_STATE`);
export const getMessages = createAction<ChatData>(`${prefix}/GET_MESSAGES`);
export const getUserHatInfo = createAction<UserData>(`${prefix}/GET_USER_HAT_INFO`);
export const setMyHat = createAction<HatType>(`${prefix}/SET_MY_HAT`);

export const getNickname = createAsyncThunk(
  `${prefix}/GET_NICKNAME`,
  async ({ shRoomId, nickname }: GetNicknameArgType) => {
    console.log(shRoomId, nickname);
    const response = await axios.post('http://13.125.59.252/api/sixHat/user/nickname', {
      shRoomId: shRoomId,
      nickname: nickname,
    });
    return response.data;
  },
);
