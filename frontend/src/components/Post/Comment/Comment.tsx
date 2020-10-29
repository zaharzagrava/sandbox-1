import React from 'react';

import { CommentDTO } from '../../../interfaces';
import Textsource from '../Textsource/Textsource';
import styles from './Comment.module.scss';

interface Props {
  comment: CommentDTO;
}

const Comment = ({ comment }: Props) => {
  return (
    <div className={styles.container}>
      <Textsource author={comment.author} full_text={comment.full_text} />
    </div>
  );
};

export default Comment;
