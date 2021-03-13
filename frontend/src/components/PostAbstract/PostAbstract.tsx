import React from "react";
import { PostDTO } from "../../interfaces";

import styles from "./PostAbstract.module.scss";

interface Props {
  post: PostDTO;
}

const PostAbstract = ({ post }: Props) => {
  return (
    <img
      className={styles.post_abstract}
      src={`${process.env.REACT_APP_API_URL}${post.multimedia[0]}`}
      alt=""
    />
  );
};

export default PostAbstract;
