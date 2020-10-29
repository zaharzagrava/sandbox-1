import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postsActions } from '../../store/Posts';
import Post from '../Post/Post';

import styles from './PostList.module.scss';

interface Props {}

const PostList = (props: Props) => {
  const dispatch = useDispatch();

  const currUser = useSelector((state) => state.session.user);
  const posts = useSelector((state) => state.posts.posts);
  console.log('12');
  useEffect(() => {
    // dispatch(postsActions.getPosts({ client_id: currUser.id }));
    dispatch(postsActions.getPosts());
  }, []);

  return (
    <div className={styles.container}>
      {posts.map((post, index) => {
        return (
          <div className={styles.post} key={index}>
            <Post post={post} comments={post.comments} />
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
