import { createReducer } from '@reduxjs/toolkit';
import { getAllGallery, getDetailGallery } from './actions';
import { GalleryState } from './types';

//initialState 선언
const initalState: GalleryState = {
  galleryList: [],
  randomWordDetail: [],
  brainWritingDetail: [],
  sixHatDetail: {
    subject: '',
    chatHistory: [],
  },
};

//createReducer로 reducer 생성.
export const galleryReducer = createReducer(initalState, builder => {
  builder
    .addCase(getAllGallery.fulfilled, (state, action) => {
      state.galleryList = action.payload;
    })
    .addCase(getDetailGallery.fulfilled, (state, action) => {
      const { category, data } = action.payload;
      if (category === 'sixhat') {
        const chatHistory = data.messageList.map((data: any) => {
          const messageData = {
            nickname: data.sender,
            hat: data.hat,
            message: data.message,
          };
          return messageData;
        });
        console.log('ㄹㅣ듀서 안에서 ', chatHistory);
        state.sixHatDetail.chatHistory = chatHistory;
      } else if (category === 'brainwriting') {
        state.brainWritingDetail = data;
      } else if (category === 'randomword') {
        state.randomWordDetail = data;
      }
    });
});
