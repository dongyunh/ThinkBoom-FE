import { createReducer } from '@reduxjs/toolkit';
import { setRoutingModalOpen, setIsMessageArrived } from './actions';
import { PermitState } from './types';

//initialState 선언
const initalState: PermitState = {
  isRoutingModalOpen: false,
  isMessageArrived: false,
};

//createReducer로 reducer 생성.
export const permitReducer = createReducer(initalState, builder => {
  builder
    .addCase(setRoutingModalOpen, (state, action) => {
      state.isRoutingModalOpen = action.payload;
    })
    .addCase(setIsMessageArrived, (state, action) => {
      state.isMessageArrived = action.payload;
    });
});
