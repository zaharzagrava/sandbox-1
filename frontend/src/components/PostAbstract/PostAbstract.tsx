import React from 'react';
import { PostDTO } from '../../interfaces';

import styles from './PostAbstract.module.scss';
import imga from './imga.png';

interface Props {
  post: PostDTO;
}

const PostAbstract = (props: Props) => {
  return <img src={imga} alt="" />;
};

export default PostAbstract;
