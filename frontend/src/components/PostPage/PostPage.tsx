import React from 'react';

import Post from '../Post/Post';
import styles from './PostPage.module.scss';

interface Props {
  id: number;
}

const PostPage = (props: Props) => {
  return (
    <div className={styles.container}>
      <Post
        post={{
          id: 1,
          full_text:
            'Ariana Grande\'s new song "Positions" seems like it\'s all about boyfriend Dalton Gomez, but it definitely sounds like she included a dig at Pete Davidson in the lyrics 🤧 Link in bio for a deep dive',
          multimedia: ['./imga.png'],
        }}
        postDerivative={{
          author: { id: 1, username: 'zendaya' },
          likes: 150,
        }}
        comments={[
          {
            id: 1,
            full_text: `This is a first comment (😝 😜 🤪 🤨 🧐 🤓 😎 ) with a lot of emojis`,
          },
          {
            id: 1,
            full_text: `This is second text comment with 🤧`,
          },
        ]}
        commentsDerivative={[
          {
            author: { id: 2, username: 'Willy Vonka' },
            likes: 100,
          },
          {
            author: { id: 3, username: 'Zaratustra' },
            likes: 200,
          },
        ]}
      />
    </div>
  );
};

export default PostPage;
