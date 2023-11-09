import { atom } from 'recoil';

export const postListState = atom({
  key: 'postListState',
  default: [],
});

export const keywordListState = atom({
  key: 'keywordListState',
  default: [],
});
