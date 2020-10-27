import React from 'react';

import styles from './PostPage.module.scss';

interface Props {
  id: number;
}

const PostPage = (props: Props) => {
  return <div className={styles.container}>Post Page of post# {props.id}</div>;
};

export default PostPage;
