import { createReducer } from '@reduxjs/toolkit';
import { enableDarkMode, enableLightMode, setSystemTheme } from './actions';
import { DarkModeState } from './types';

const initialState: DarkModeState = {
  theme: 'default',
  systemTheme: 'light',
};

//createReducer로 reducer 생성.
export const darkmodeReducer = createReducer(initialState, builder => {
  builder
    .addCase(enableDarkMode, state => {
      state.theme = 'dark';
    })
    .addCase(enableLightMode, state => {
      state.theme = 'light';
    })
    .addCase(setSystemTheme, (state, action) => {
      state.systemTheme = action.payload;
    });
});
