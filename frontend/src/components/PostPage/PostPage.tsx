import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postsActions } from '../../store/Posts';

import Post from '../Post/Post';
import styles from './PostPage.module.scss';

interface Props {
  id: number;
}

const PostPage = ({ id }: Props) => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts.post);

  useEffect(() => {
    dispatch(postsActions.getPost(id));
  }, []);

  return (
    <div className={styles.container}>
      <Post post={post} comments={post.comments} />
    </div>
  );
};

export default PostPage;
