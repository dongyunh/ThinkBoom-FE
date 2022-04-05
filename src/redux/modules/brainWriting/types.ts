export type BWUserData = {
  nickname: string;
};
export type ChatData = {
  nickname: string | null;
  message: string | null;
};
export type ChatHistoryType = ChatData[];

export type BWUserList = BWUserData[];

export type UserId = number | null;

export type RoomId = string | null;

export type BWUserCount = {
  totalUser: number;
  currentUser: number;
};

export type InitializeIdeaCardArgType = {
  roomId: string;
};

export type PostIdeaArgType = {
  bwRoomId: RoomId;
  userId: UserId;
  idea: string;
};

export type GetIdeaArgType = {
  roomId: RoomId;
  userId: UserId;
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

export type VoteIdeaArgType = {
  userId: UserId;
  roomId: string | null;
};

export type PostCommentArgType = {
  userId: UserId;
  roomId: RoomId;
  ideaId: number;
  comment: string;
};

export type Idea = {
  ideaId: number;
  idea: string;
  commentList: { comment: string }[];
};

export type IdeaList = {
  subject: string;
  ideaList: Idea[];
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
  votedIdeaList: number[];
};
