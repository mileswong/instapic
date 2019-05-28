import { createAction } from 'redux-actions';
import { message } from 'antd';

import {
  apiLoginUser,
  apiRefreshUser,
  apiSignupUser,
} from 'utils/api';
import { ERROR_MESSAGE_MAP } from 'constants/index';


export const updateCurrentUserBegin = createAction('UPDATE_CURRENT_USER_BEGIN');
export const updateCurrentUserEnd = createAction('UPDATE_CURRENT_USER_END');

export const loginUser = (payload) => async (dispatch) => {
  dispatch(updateCurrentUserBegin());
  try {
    const response = await apiLoginUser(payload);
    const { user } = response.data;
    dispatch(updateCurrentUserEnd({ user }));
  } catch (error) {
    const errorMessage = ERROR_MESSAGE_MAP[error.response.data.message];
    errorMessage && message.error(errorMessage);
    dispatch(updateCurrentUserEnd());
  }
}

export const refreshUser = () => async (dispatch) => {
  try {
    const response = await apiRefreshUser();
    let user;
    if (response.ok) {
      user = await response.json();
    }
    dispatch(updateCurrentUserEnd({ user }));
  } catch (err) {
    console.error(err);
  }
}

export const signupUser = (payload) => async (dispatch) => {
  dispatch(updateCurrentUserBegin());
  try {
    const response = await apiSignupUser(payload);
    const { user } = response.data;
    dispatch(updateCurrentUserEnd({ user }));
  } catch (error) {
    const errorMessage = ERROR_MESSAGE_MAP[error.response.data.message];
    errorMessage && message.error(errorMessage);
    dispatch(updateCurrentUserEnd());
  }
}
