export type BWUserData = {
  nickname: string;
};
export type ChatData = {
  nickname: string | null;
  message: string | null;
};
export type ChatHistoryType = ChatData[];

export type BWUserList = BWUserData[];

export type BWUserCount = {
  totalUser: number;
  currentUser: number;
};

export type InitializeIdeaCardArgType = {
  roomId: string;
};

export type PostIdeaArgType = {
  bwRoomId: string | null;
  userId: number | null;
  idea: string;
};

export type GetIdeaArgType = {
  roomId: string | null;
  userId: number | null;
};

export type GetIdeaType = {
  viewUserId: number;
  ideaId: number;
  idea: string;
};

export type GetIdeaPayLoadType = {
  isFirstComment: boolean;
  isLastComment: boolean;
  viewUserId: number;
  ideaId: number;
  idea: string;
};

export type PostCommentArgType = {
  userId: number | null;
  roomId: string | null;
  ideaId: number;
  comment: string;
};

export type BrainWritingState = {
  StartCurrentPage: number;
  currentPage: number;
  nickname: string | null;
  isAdmin: boolean;
  BWisSubmit: boolean;
  BWsubject?: string;
  userId: number | null;
  ideaId: number;
  bwRoomId: string | null;
  BWtimer: number | null;
  BWUserList: BWUserList;
  BWUserCount: BWUserCount;
  chatHistory?: ChatHistoryType;
  viewIdea: string;
  isTimerCalled: boolean;
  isTimerOver: boolean;
  isFirstComment: boolean;
  isLastComment: boolean;
};
