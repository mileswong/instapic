import { MAX_FILE_SIZE_IN_MB, VALID_FILE_TYPE_SET } from 'constants/index';


export const getImageBase64Result = (imgFile, callback) => {
  const reader = new FileReader();
  reader.onloadend = () => callback(reader.result);
  reader.readAsDataURL(imgFile);
}

export const isFileTypeValid = file => VALID_FILE_TYPE_SET.has(file.type);

export const isFileSizeValid = file => file.size / 1024 / 1024 < MAX_FILE_SIZE_IN_MB;
