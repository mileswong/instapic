import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Form, Input, Icon, Upload, message } from 'antd';

import { addNewPost } from 'actions/post';
import { MAX_FILE_SIZE_IN_MB } from 'constants/index';
import {
  getImageBase64Result,
  isFileTypeValid,
  isFileSizeValid,
} from 'utils/file';

import './PostForm.scss';


const { TextArea } = Input;

const descriptionRule = {
  rules: [
    {
      required: true,
      message: 'Please input the description of the picture.',
    },
  ],
};


const PostForm = (props) => {
  const { form, onClosePostFormModal } = props;
  const { getFieldDecorator, validateFields, resetFields } = form;

  const prevIsAddingPost = useRef(null);
  const imageFile = useRef(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const dispatch = useDispatch();
  const { isAddingPost } = useSelector(state => state.post);

  // close the modal and reset form when finished
  useEffect(() => {
    if (prevIsAddingPost.current && prevIsAddingPost.current !== isAddingPost) {
      onClosePostFormModal();

      // reset fields after close modal animation
      setTimeout(() => {
        resetFields();
        setImageUrl(null);
        imageFile.current = null;
      }, 1500);
    }
    prevIsAddingPost.current = isAddingPost;
  }, [isAddingPost, onClosePostFormModal, resetFields])

  // validate description and image file existence
  const handleSubmitForm = (e) => {
    e.preventDefault();

    validateFields((err, values) => {
      if (!err) {
        if (!imageFile.current) {
          message.error('Please add an image.');
          return;
        }
        dispatch(addNewPost({
          ...values,
          file: imageFile.current,
        }));
      }
    });
  };

  // validate user file by type and size
  const beforeUpload = (file) => {
    if (!isFileTypeValid(file)) {
      message.error('Only JPG or PNG file can be uploaded.');
      return false;
    }
    if (!isFileSizeValid(file)) {
      message.error(`File size must be less than ${MAX_FILE_SIZE_IN_MB}MB.`);
      return false;
    }

    imageFile.current = file;
    setIsImageLoading(true);
    getImageBase64Result(file, (result) => {
      setIsImageLoading(false);
      setImageUrl(result);
    });

    // do not upload immediately
    return false;
  }

  return (
    <>
      <Form className="post-form" onSubmit={handleSubmitForm}>
        <Form.Item>
          {getFieldDecorator('description', descriptionRule)(
            <TextArea rows={4} placeholder="Enter description here" />
          )}
        </Form.Item>

        <Form.Item>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
          >
            {imageUrl
              ? <img alt="upload" src={imageUrl} />
              : (
                <div>
                  <Icon type={isImageLoading ? 'loading' : 'plus'} />
                  <div className="ant-upload-text">Upload Image</div>
                </div>
              )}
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button
            className="post-form__button--submit"
            type="primary"
            htmlType="submit"
            loading={isAddingPost}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

PostForm.propTypes = {
  form: PropTypes.object.isRequired,
  onClosePostFormModal: PropTypes.func.isRequired,
};

// Inject Form props into PostForm
const WrappedPostForm = Form.create({ name: 'post-form' })(PostForm);

export default WrappedPostForm;
