import { handleActions } from 'redux-actions';

import * as Actions from 'actions/post';


const defaultState = {
  posts: [],
  isAddingPost: false,
  hasFetchedPosts: false,
};

export default handleActions({
  [Actions.addNewPostBegin]: (state, { payload }) => {
    return {
      ...state,
      isAddingPost: true,
    };
  },
  [Actions.addNewPostEnd]: (state, { payload }) => {
    const posts = payload ? [payload, ...state.posts] : state.posts;
    return {
      ...state,
      posts,
      isAddingPost: false,
    };
  },
  [Actions.updatePostListBegin]: (state, { payload }) => {
    return {
      ...state,
      posts: [],
      hasFetchedPosts: false,
    };
  },
  [Actions.updatePostListEnd]: (state, { payload }) => {
    return {
      ...state,
      posts: payload,
      hasFetchedPosts: true,
    };
  },
}, defaultState);
