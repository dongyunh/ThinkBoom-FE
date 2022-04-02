import { createReducer } from '@reduxjs/toolkit';
import { getAllGallery, getDetailGallery } from './actions';
import { GalleryState } from './types';

//initialState 선언
const initalState: GalleryState = {
  galleryList: [],
  randomWordDetail: [],
  brainWritingDetail: [],
  sixHatDetail: [],
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
        state.sixHatDetail = data;
      } else if (category === 'brainwriting') {
        state.brainWritingDetail = data;
      } else if (category === 'randomword') {
        state.randomWordDetail = data;
      }
    });
});
