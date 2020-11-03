import React from 'react';

import { CommentDTO, PostDTO } from '../../interfaces';
import Comment from './Comment/Comment';
import styles from './Post.module.scss';
import ClientImage from '../ClientImage/ClientImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Textsource from './Textsource/Textsource';
import AddComment from './AddComment/AddComment';

const API_URL = `http://localhost:4000`;

interface Props {
  post: PostDTO;
  comments: CommentDTO[];
}

const Post = ({ post, comments }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img
          className={styles.img}
          src={`${API_URL}${post.multimedia[0]}`}
          alt=""
          width={420}
          height={600}
        />
      </div>
      <div className={styles.right}>
        <div className={styles.header}>
          <div className={styles.client_image}>
            <ClientImage src={post.author.avatar} />
          </div>
          <div className={styles.client_info}>
            <a className={styles.username} href="">
              {post.author.username}
            </a>
            <span className={styles.dot}>•</span>
            <button className={styles.follow}>Follow</button>
            <button className={styles.more}>•••</button>
          </div>
        </div>
        <div className={styles.full_text_container}>
          <Textsource author={post.author} full_text={post.full_text} />
        </div>
        <div className={styles.comments}>
          {comments.map((comment, index) => {
            return <Comment key={index} comment={comment} />;
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
          <div className={styles.likes}>1,000,000 likes</div>
          <div className={styles.createdAt}>
            {post.createdAt &&
              new Date(post.createdAt).toLocaleDateString('en-US')}
          </div>
        </div>
        <AddComment post_id={post.id as any} />
      </div>
    </div>
  );
};

export default Post;
