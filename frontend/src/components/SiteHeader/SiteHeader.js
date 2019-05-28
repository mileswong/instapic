import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Modal, Menu, Icon } from 'antd';
import { Link } from "react-router-dom";

import UserForm from 'components/UserForm';
import PostForm from 'components/PostForm';

import { refreshUser } from 'actions/user';

import './SiteHeader.scss';


const SubMenu = Menu.SubMenu;

const SiteHeader = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);

  const { user, isFirstLoaded } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const isLoggedIn = !!user;

  const toggleUserModal = useCallback(() => {
    setIsLoginModalOpen(isOpen => !isOpen);
  }, []);
  const updateFormType = useCallback(() => {
    setIsLoginForm(isLogin => !isLogin);
  }, []);
  const togglePostModal = useCallback(() => {
    setIsNewPostModalOpen(isOpen => !isOpen);
  }, []);

  // try to login user when mount
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  // reset to login form when user form is closed
  useEffect(() => {
    if (!isLoginModalOpen && !isLoginForm) {
      setIsLoginForm(true);
    }
  }, [isLoginModalOpen, isLoginForm]);

  return (
    <nav className="site-header-wrapper">
      <div className="ip-container">
        <div className="site-header">
          <div className="site-header__logo">
            <Link to="/">InstaPic</Link>
          </div>

          {isFirstLoaded && isLoggedIn && (
            <>
              <Menu mode="horizontal" selectable={false}>
                <SubMenu
                  title={
                    <div>
                      <Icon type="user" style={{ color: 'rgba(0,0,0,.75)' }} />
                      <Link to={`/user/${user.id}`}>{user.username}</Link>
                    </div>
                  }
                >
                  <Menu.Item>
                    <Button
                      type="link"
                      className="site-header__add-post-btn"
                      onClick={togglePostModal}
                    >
                      Add New Post
                    </Button>
                  </Menu.Item>
                </SubMenu>
              </Menu>
              <Modal
                title="Add a New Post"
                visible={isNewPostModalOpen}
                onOk={togglePostModal}
                onCancel={togglePostModal}
                footer={null}
              >
                <PostForm
                  onClosePostFormModal={togglePostModal}
                />
              </Modal>
            </>
          )}

          {isFirstLoaded && !isLoggedIn && (
            <div>
              <Button
                className="site-header__status"
                onClick={toggleUserModal}
              >
                Login
              </Button>

              <Modal
                title={isLoginForm ? 'Login' : 'Signup'}
                visible={isLoginModalOpen}
                onOk={toggleUserModal}
                onCancel={toggleUserModal}
                footer={null}
              >
                <UserForm
                  isLoginForm={isLoginForm}
                  onChangeFormClicked={updateFormType}
                />
              </Modal>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default SiteHeader;
