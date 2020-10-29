import React from 'react';
import { PostDTO } from '../../interfaces';

import styles from './PostAbstract.module.scss';
import imga from './imga.png';

interface Props {
  post: PostDTO;
}

const PostAbstract = ({ post }: Props) => {
  return (
    <img
      className={styles.post_abstract}
      src={`http://localhost:4000/uploads/${post.multimedia[0]}`}
      alt=""
    />
  );
};

export default PostAbstract;
