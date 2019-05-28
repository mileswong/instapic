export const IS_DEV = process.env.NODE_ENV !== 'production';
export const BASE_URL = IS_DEV
  ? 'http://localhost:8000/v1'
  : 'https://instapic-miles.herokuapp.com/v1';


export const VALID_FILE_TYPE_SET = new Set(['image/jpeg', 'image/png', 'image/jpg']);
export const MAX_FILE_SIZE_IN_MB = 5;


export const ERROR_MESSAGE_MAP = {
  ERR_USERNAME_IS_USED: 'The username chosen is taken by other user. Please try another username.',
  ERR_INVALID_USERNAME_OR_PASSWORD: 'Username or password is incorrect.',
};
