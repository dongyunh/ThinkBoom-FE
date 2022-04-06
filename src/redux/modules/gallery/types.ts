import { HatType } from '../sixHat/types';
// initialState의 타입 선언
export type UserCount = {
  currentUser: number;
  totalUser: number;
};

export type User = {
  nickname: string;
  hat?: HatType;
};

export type UserList = User[];

export type Category = 'randomword' | 'brainwriting' | 'sixhat';

export type DetailArgType = {
  category: Category;
  roomId: string;
};

export type Gallery = {
  roomId: string;
  category: Category;
  title: string;
  subject: string;
};

export type VoteResultType = {
  ideaId: number;
  idea: string;
  voteCount?: number;
  isWinner?: boolean;
  commentList: string[];
};

export type BrainWritingDataType = {
  subject: string;
  bwId: number;
  voteResult: VoteResultType[];
};

export type ChatData = {
  nickname: string;
  hat: HatType;
  message: string;
};

export type SixHatDataType = {
  subject: string;
  chatHistory: ChatData[];
};

export type PaginationInfo = {
  page: number;
  size: number;
};

export type GalleryState = {
  galleryList: Gallery[];
  randomWordDetail: string[];
  brainWritingDetail: BrainWritingDataType;
  sixHatDetail: SixHatDataType;
};
