import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import MasonryImageGrid from 'components/MasonryImageGrid';
import { getUserPosts } from 'actions/post';


const UserPage = ({ match }) => {
  const dispatch = useDispatch();
  const { posts, hasFetchedPosts } = useSelector(state => state.post);

  // fetch user posts
  useEffect(() => {
    dispatch(getUserPosts(match.params.userId));
  }, [dispatch, match]);

  const hasNoPosts = posts.length === 0 && hasFetchedPosts;
  return (
    <div className="ip-container">
      {hasNoPosts
        ? <div>This user doesn't have any pictures yet.</div>
        : <MasonryImageGrid posts={posts} />
      }
    </div>
  );
}

UserPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default UserPage;
