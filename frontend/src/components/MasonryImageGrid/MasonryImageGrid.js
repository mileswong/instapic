import React from 'react';
import PropTypes from 'prop-types';

import MasonryImageGridItem from './MasonryImageGridItem';

import './MasonryImageGrid.scss';


const MasonryImageGrid = React.memo((props) => {
  const { posts } = props;
  return (
    <div className="masonry-image-grid">
      {posts.map(post => (
        <MasonryImageGridItem
          key={post.id}
          post={post}
        />
      ))}
    </div>
  )
});

MasonryImageGrid.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default MasonryImageGrid;
