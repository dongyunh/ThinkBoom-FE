import { createReducer } from '@reduxjs/toolkit';
import {
  updateCurrentPageBW,
  getNickname,
  updateAdminState,
  clearChatHistory,
  changeIsSubmitState,
  getSubjectBW,
  getMessagesBW,
  getUserListBW,
  getRoomId,
  getTimerData,
  updateStartCurrentPageBW,
  getUserCount,
  getIdea,
  getIdeaList,
  updateTimerData,
  setIsTimerCalled,
  getUpdatedTimerData,
  setIsTimerOver,
  initializeTimerData,
  setIsFirstComment,
  getVoteTimerData,
  getVotedIdeaList,
  updateComment,
  voteIdea,
} from './actions';
import { BrainWritingState } from './types';
import { PURGE } from 'redux-persist';

const initialState: BrainWritingState = {
  StartCurrentPage: 0,
  currentPage: 0,
  nickname: null,
  isAdmin: false,
  BWisSubmit: false,
  BWsubject: undefined,
  userId: null,
  ideaId: 0,
  BWtimer: null,
  chatHistory: [],
  roomId: null,
  BWUserCount: {
    totalUser: 0,
    currentUser: 0,
  },
  BWUserList: [],
  viewIdea: '',
  isTimerCalled: false,
  isTimerOver: false,
  isFirstComment: false,
  isLastComment: false,
  votedIdeaList: [],
  ideaList: [],
  comment: '',
  isAllVoted: false,
};

//createReducer로 reducer 생성.
export const brainWritingReducer = createReducer(initialState, builder => {
  builder
    .addCase(updateStartCurrentPageBW, (state, action) => {
      state.StartCurrentPage = action.payload;
    })
    .addCase(updateCurrentPageBW, (state, action) => {
      state.currentPage = action.payload;
    })
    .addCase(getNickname.fulfilled, (state, action) => {
      const { nickname, userId } = action.payload;
      state.nickname = nickname;
      state.userId = userId;
    })
    .addCase(changeIsSubmitState, (state, action) => {
      state.BWisSubmit = action.payload;
    })
    .addCase(updateAdminState, (state, action) => {
      state.isAdmin = action.payload;
    })
    .addCase(getMessagesBW, (state, action) => {
      if (state.chatHistory) {
        state.chatHistory = [action.payload, ...state.chatHistory];
      }
    })
    .addCase(getUserListBW, (state, action) => {
      state.BWUserList = action.payload;
    })
    .addCase(clearChatHistory, state => {
      state.chatHistory = [];
    })
    .addCase(getSubjectBW, (state, action) => {
      state.BWsubject = action.payload;
    })
    .addCase(getRoomId, (state, action) => {
      state.roomId = action.payload;
    })

    .addCase(getUserCount, (state, action) => {
      state.BWUserCount = action.payload;
    })
    .addCase(getIdea.fulfilled, (state, action) => {
      const { idea, ideaId, isLastComment } = action.payload;
      state.ideaId = ideaId;
      state.viewIdea = idea;
      state.isLastComment = isLastComment;
    })
    .addCase(getIdeaList.fulfilled, (state, action) => {
      const { ideaList } = action.payload;
      state.ideaList = ideaList;
    })
    .addCase(voteIdea.fulfilled, (state, action) => {
      const { totalUser, presentVotedUser } = action.payload;
      if (totalUser == presentVotedUser) {
        state.isAllVoted = true;
      } else {
        state.isAllVoted = false;
      }
    })
    .addCase(setIsFirstComment, (state, action) => {
      state.isFirstComment = action.payload;
    })
    .addCase(getTimerData.fulfilled, (state, action) => {
      const { timers } = action.payload;
      state.BWtimer = timers;
      state.isTimerCalled = true;
    })
    .addCase(updateTimerData, (state, action) => {
      state.BWtimer = action.payload;
    })
    .addCase(getVoteTimerData.fulfilled, (state, action) => {
      const { timers } = action.payload;
      state.BWtimer = timers;
      state.isTimerCalled = true;
    })
    .addCase(setIsTimerCalled, (state, action) => {
      state.isTimerCalled = action.payload;
    })
    .addCase(getUpdatedTimerData.fulfilled, (state, action) => {
      const { timers } = action.payload;
      state.BWtimer = timers;
    })
    .addCase(setIsTimerOver, (state, action) => {
      state.isTimerOver = action.payload;
    })
    .addCase(initializeTimerData, (state, action) => {
      state.isTimerOver = false;
      state.isTimerCalled = false;
    })
    .addCase(getVotedIdeaList, (state, action) => {
      const settedList = new Set(state.votedIdeaList);
      if (settedList.has(action.payload)) {
        settedList.delete(action.payload);
      } else {
        settedList.add(action.payload);
      }
      state.votedIdeaList = [...settedList];
    })
    .addCase(updateComment, (state, action) => {
      state.comment = action.payload;
    })
    .addCase(PURGE, (state, action) => {
      return initialState;
    });
});
