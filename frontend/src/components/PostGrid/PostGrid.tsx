import React from 'react';

import { PostDTO } from '../../interfaces';
import styles from './PostGrid.module.scss';
import PostAbstract from '../PostAbstract/PostAbstract';

interface Props {
  posts: PostDTO[];
}

const PostGrid = ({ posts }: Props) => {
  return (
    <div className={styles.container}>
      {posts.map((post, index) => {
        return (
          <div
            className={`${styles.post} ${
              (index + 1) % 3 === 0 && styles.last_post
            }`}
            key={post.id}
          >
            <PostAbstract post={post} />
          </div>
        );
      })}
    </div>
  );
};

export default PostGrid;
