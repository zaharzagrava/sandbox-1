import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { ProfileTabs } from '../../interfaces';
import PostGrid from '../PostGrid/PostGrid';
import ClientInfo from './ClientInfo/ClientInfo';
import styles from './Profile.module.scss';
import Tab from './Tab/Tab';

interface Props {
  id: number;
  tab: ProfileTabs;
}

const Profile = (props: Props) => {
  // const currUser = useSelector((state) => state.session.user);
  const currUser = {
    id: 1,
  };
  const [currTab, setcurrTab] = useState(props.tab);

  const tabs = [
    { name: ProfileTabs.POSTS },
    { name: ProfileTabs.IGTV },
    { name: ProfileTabs.TAGGED },
  ];
  if (currUser.id === props.id) tabs.splice(2, 0, { name: ProfileTabs.SAVED });

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
        {tabs.map((elem) => {
          return (
            <Tab
              name={elem.name}
              setcurrTab={(e) => setcurrTab(elem.name)}
              isActive={currTab === elem.name}
            />
          );
        })}
      </div>
      <div className={styles.chosen_tab}>
        {currTab === ProfileTabs.POSTS && (
          <PostGrid
            posts={[
              {
                full_text: 'thateha eh aeth aet haet haeth asf',
                id: 1,
              },
              {
                full_text: 'thateha eh aeth aet haet haeth asf',
                id: 2,
              },
              {
                full_text: 'thateha eh aeth aet haet haeth asf',
                id: 3,
              },
              {
                full_text: 'thateha eh aeth aet haet haeth asf',
                id: 4,
              },
              {
                full_text: 'thateha eh aeth aet haet haeth asf',
                id: 5,
              },
            ]}
          />
        )}
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
