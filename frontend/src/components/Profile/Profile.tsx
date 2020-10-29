import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ProfileTabs } from '../../interfaces';
import { postsActions } from '../../store/Posts';
import PostGrid from '../PostGrid/PostGrid';
import ClientInfo from './ClientInfo/ClientInfo';
import styles from './Profile.module.scss';
import Tab from './Tab/Tab';

interface Props {
  id: number;
  tab: ProfileTabs;
}

const Profile = ({ id, tab }: Props) => {
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.session.user);
  const [currTab, setcurrTab] = useState(tab);

  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    dispatch(postsActions.getPosts({ client_id: id }));
  }, []);

  const tabs = [
    { name: ProfileTabs.POSTS },
    { name: ProfileTabs.IGTV },
    { name: ProfileTabs.TAGGED },
  ];
  if (currUser.id === id) tabs.splice(2, 0, { name: ProfileTabs.SAVED });

  return (
    <div className={styles.container}>
      <ClientInfo
        client={{
          id: 0,
          full_name: 'John #testtag',
          username: 'John #testtag',
          website: 'www.johntest.com',
          bio: 'VOTE',
        }}
      />
      <div className={styles.tabbar}>
        {tabs.map((elem, index) => {
          return (
            <Tab
              key={index}
              name={elem.name}
              setcurrTab={(e) => setcurrTab(elem.name)}
              isActive={currTab === elem.name}
            />
          );
        })}
      </div>
      <div className={styles.chosen_tab}>
        {currTab === ProfileTabs.POSTS && <PostGrid posts={posts} />}
        {currTab === ProfileTabs.IGTV && (
          <div style={{ textAlign: 'center' }}>IGTV stub :)</div>
        )}
        {currTab === ProfileTabs.SAVED && (
          <div style={{ textAlign: 'center' }}>SAVED stub :)</div>
        )}
        {currTab === ProfileTabs.TAGGED && (
          <div style={{ textAlign: 'center' }}>TAGGED stub :)</div>
        )}
      </div>
    </div>
  );
};

export default Profile;
