import React from 'react';

import { ClientDTO, CommentDerivative, CommentDTO } from '../../../interfaces';
import Textsource from '../Textsource/Textsource';
import styles from './Comment.module.scss';

interface Props {
  comment: CommentDTO;
  commentDerivative: CommentDerivative;
}

const Comment = ({ comment, commentDerivative }: Props) => {
  return (
    <div className={styles.container}>
      <Textsource
        author={commentDerivative.author}
        full_text={comment.full_text}
      />
    </div>
  );
};

export default Comment;
