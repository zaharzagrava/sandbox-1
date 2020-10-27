import React from 'react';

import { PostDTO } from '../../interfaces';
import styles from './PostGrid.module.scss';
import imga from './imga.png';
import PostAbstract from '../PostAbstract/PostAbstract';

interface Props {
  posts: PostDTO[];
}

const PostGrid = ({ posts }: Props) => {
  return (
    <div className={styles.container}>
      {posts.map((post, index) => {
        return (
          <div
            className={`${styles.post} ${
              (index + 1) % 3 === 0 && styles.last_post
            }`}
          >
            <PostAbstract post={post} />
          </div>
        );
      })}
    </div>
  );
};

export default PostGrid;

// const PostGrid = ({ posts }: Props) => {
//   const postFlexGrid = [];

//   for (let i = 0; i < posts.length; i += 3) {
//     postFlexGrid.push([posts[i], posts[i + 1], posts[i + 2]]);
//   }

//   console.log('@postFlexGrid');
//   console.log(postFlexGrid);

//   return (
//     <div className={styles.container}>
//       {postFlexGrid.map((postRow, index) => {
//         return (
//           <div className={styles.post_row}>
//             {postRow.map((post, index) => (
//               <img
//                 src={imga}
//                 className={
//                   (index + 1) % 3 === 0 ? styles.last_post : styles.post
//                 }
//               />
//             ))}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default PostGrid;
