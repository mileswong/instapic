import { createAction } from 'redux-actions';
import { message } from 'antd';

import {
  apiGetAllPosts,
  apiGetUserPosts,
  apiAddUserNewPost,
} from 'utils/api';


export const addNewPostBegin = createAction('ADD_NEW_POST_BEGIN');
export const addNewPostEnd = createAction('ADD_NEW_POST_END');
export const updatePostListBegin = createAction('UPDATE_POST_LIST_BEGIN');
export const updatePostListEnd = createAction('UPDATE_POST_LIST_END');

export const addNewPost = (payload) => async (dispatch, getState) => {
  const { user, router } = getState();
  const { id: userId } = user.user;

  const { pathname } = router.location;
  const userIdMatch = pathname.match('/user/([0-9]+)')
  const viewingUserId = userIdMatch && Number(userIdMatch[1]);

  dispatch(addNewPostBegin());
  try {
    const postPayload = {
      ...payload,
      userId: userId,
    };
    const formData = new FormData();
    Object.keys(postPayload).forEach((key) => {
      formData.append(key, postPayload[key]);
    });
    const response = await apiAddUserNewPost(formData);

    // update post to current page if needed
    let post = null;
    if (response.ok && (userId === viewingUserId || viewingUserId === null)) {
      ({ post } = await response.json());
    }

    message.success('Your post has been successfully submitted!');
    dispatch(addNewPostEnd(post));
  } catch (err) {
    dispatch(addNewPostEnd());
  }
}

export const getAllPosts = () => async (dispatch) => {
  dispatch(updatePostListBegin());
  const response = await apiGetAllPosts();
  const { posts } = response.data;
  dispatch(updatePostListEnd(posts));
}

export const getUserPosts = (userId) => async (dispatch) => {
  dispatch(updatePostListBegin());
  const response = await apiGetUserPosts(userId);
  const { posts } = response.data;
  dispatch(updatePostListEnd(posts));
}
