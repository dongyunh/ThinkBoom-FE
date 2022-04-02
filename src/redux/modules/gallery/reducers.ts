import { createReducer } from '@reduxjs/toolkit';
import { getAllGallery } from './actions';
import { GalleryState } from './types';

//initialState 선언
const initalState: GalleryState = {
  galleryList: [],
};

//createReducer로 reducer 생성.
export const galleryReducer = createReducer(initalState, builder => {
  builder.addCase(getAllGallery.fulfilled, (state, action) => {
    state.galleryList = action.payload;
  });
});
