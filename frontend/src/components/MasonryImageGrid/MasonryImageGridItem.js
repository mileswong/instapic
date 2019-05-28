import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Button } from 'antd';

import './MasonryImageGrid.scss';


const MasonryImageGridItem = React.memo((props) => {
  const { post } = props;
  const { url, description, author } = post;

  return (
    <div className="masonry-image-grid-item">
      <div className="masonry-image-grid-item__details">
        <div
          className="masonry-image-grid-item__overlay"
        />
        <div className="masonry-image-grid-item__author">
          <Button
            type="link"
          >
            <Link to={`/user/${author.id}`}>{author.username}</Link>
          </Button>
          <div>{description}</div>
        </div>
      </div>
      <img
        alt={description}
        src={url}
        className="masonry-image-grid__image"
      />
    </div>
  )
});

MasonryImageGridItem.propTypes = {
  post: PropTypes.object.isRequired,
};

export default MasonryImageGridItem;
