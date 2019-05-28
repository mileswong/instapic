import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MasonryImageGrid from 'components/MasonryImageGrid';
import { getAllPosts } from 'actions/post';


const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.post);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <div className="ip-container">
      <MasonryImageGrid posts={posts} />
    </div>
  );
}

export default Home;
