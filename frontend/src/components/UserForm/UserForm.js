import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Icon } from 'antd';

import { loginUser, signupUser } from 'actions/user';

import './UserForm.scss';


const usernameRule = {
  rules: [
    {
      required: true,
      message: 'Please input your username.',
    },
  ],
};
const passwordRule = {
  rules: [
    {
      required: true,
      message: 'Please input your password.',
    },
  ],
};

const UserForm = (props) => {
  const { isLoginForm, onChangeFormClicked, form } = props;
  const { getFieldDecorator, resetFields, validateFields } = form;

  const dispatch = useDispatch();
  const { isFetchingUser } = useSelector(state => state.user);

  useEffect(() => {
    resetFields();
  }, [isLoginForm, resetFields]);

  const handleSubmitForm = (e) => {
    e.preventDefault();

    validateFields((err, values) => {
      if (!err) {
        if (isLoginForm) {
          dispatch(loginUser(values));
        } else {
          dispatch(signupUser(values));
        }
      }
    });
  };


  const calloutMessage = isLoginForm
    ? { message: 'Haven\'t yet have an account?', buttonStr: 'Signup Now!', formButtonStr: 'Log in' }
    : { message: 'Already have an account?', buttonStr: 'Login Now!', formButtonStr: 'Sign up' };

  return (
    <>
      <Form className="user-form" onSubmit={handleSubmitForm}>
        <Form.Item>
          {getFieldDecorator('username', usernameRule)(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('password', passwordRule)(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>

        <Form.Item>
          <Button
            className="user-form__button--submit"
            type="primary"
            htmlType="submit"
            loading={isFetchingUser}
          >
            {calloutMessage.formButtonStr}
          </Button>
        </Form.Item>
      </Form>

      <div>
        {calloutMessage.message}
        <Button
          className="user-form__button--cancel"
          type="link"
          onClick={onChangeFormClicked}
        >
          {calloutMessage.buttonStr}
        </Button>
      </div>
    </>
  );
}

UserForm.propTypes = {
  isLoginForm: PropTypes.bool.isRequired,
  form: PropTypes.object.isRequired,
  onChangeFormClicked: PropTypes.func.isRequired,
};

// Inject Form props into UserForm
const WrappedUserForm = Form.create({ name: 'user-form' })(UserForm);

export default WrappedUserForm;
