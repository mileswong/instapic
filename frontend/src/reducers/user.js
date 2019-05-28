import { handleActions } from 'redux-actions';

import * as Actions from 'actions/user';


const defaultState = {
  user: null,
  isFirstLoaded: false,
  isFetchingUser: false,
};

export default handleActions({
  [Actions.updateCurrentUserBegin]: (state) => ({
    ...state,
    user: null,
    isFetchingUser: true,
  }),
  [Actions.updateCurrentUserEnd]: (state, { payload }) => ({
    ...state,
    user: payload ? payload.user : null,
    isFirstLoaded: true,
    isFetchingUser: false,
  }),
}, defaultState);
