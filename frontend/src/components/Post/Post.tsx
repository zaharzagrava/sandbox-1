import React from 'react';

import {
  ClientDTO,
  CommentDerivative,
  CommentDTO,
  PostDerivative,
  PostDTO,
} from '../../interfaces';
import Comment from './Comment/Comment';
import styles from './Post.module.scss';
import imga from './imga.png';
import ClientImage from '../ClientImage/ClientImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Textsource from './Textsource/Textsource';
import AddComment from './AddComment/AddComment';

interface Props {
  post: PostDTO;
  postDerivative: PostDerivative;
  comments: CommentDTO[];
  commentsDerivative: CommentDerivative[];
}

const Post = ({
  post,
  postDerivative,
  comments,
  commentsDerivative,
}: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img
          className={styles.img}
          src={imga}
          alt=""
          width={420}
          height={600}
        />
      </div>
      <div className={styles.right}>
        <div className={styles.header}>
          <div className={styles.client_image}>
            <ClientImage />
          </div>
          <div className={styles.client_info}>
            <a className={styles.username} href="">
              {postDerivative.author.username}
            </a>
            <span>•</span>
            <button className={styles.follow}>Follow</button>
            <button className={styles.more}>•••</button>
          </div>
        </div>
        <div className={styles.full_text_container}>
          <Textsource
            author={postDerivative.author}
            full_text={post.full_text}
          />
        </div>
        <div className={styles.comments}>
          {comments.map((comment, index) => {
            return (
              <Comment
                key={index}
                comment={comment}
                commentDerivative={commentsDerivative[index]}
              />
            );
          })}
        </div>
        <div className={styles.stats}>
          <div className={styles.actions}>
            <div>
              <FontAwesomeIcon
                icon="heart"
                className={styles.icon}
              ></FontAwesomeIcon>
            </div>
            <div>
              <FontAwesomeIcon
                icon="comment"
                className={styles.icon}
              ></FontAwesomeIcon>
            </div>
            <div>
              <FontAwesomeIcon
                icon="envelope"
                className={styles.icon}
              ></FontAwesomeIcon>
            </div>
            <div className={styles.bookmark}>
              <FontAwesomeIcon
                icon="bookmark"
                className={`${styles.icon}`}
              ></FontAwesomeIcon>
            </div>
          </div>
          <div className={styles.likes}>8,232,123 likes</div>
          <div className={styles.createdAt}>SEPTEMBER 21</div>
        </div>
        <AddComment />
      </div>
    </div>
  );
};

export default Post;
