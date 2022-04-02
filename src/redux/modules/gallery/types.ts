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

export type Gallery = {
  roomId: string;
  category: Category;
  title: string;
  subject: string;
};

export type GalleryState = {
  galleryList: Gallery[];
};
