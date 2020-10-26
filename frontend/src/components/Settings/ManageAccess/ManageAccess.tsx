import React, { useState } from 'react';

import styles from './ManageAccess.module.scss';
import Tab from './Tab/Tab';
import TabElem from './TabElem/TabElem';

interface Props {}

const ManageAccess = (props: Props) => {
  const [currID, setCurrID] = useState(0);

  const tabs = [
    {
      name: 'ACTIVE',
      id: 0,
      text:
        "These are apps and websites you've used Instagram to log into and have recently used. They can request info you chose to share with them.",
      prompt:
        'You have not authorized any applications to access your Instagram account.',
    },
    {
      name: 'EXPIRED',
      id: 1,
      text:
        "These are apps and websites you've used Instagram to log into and may not have used in a while. They may still have access to info you previously shared, but their ability to make additional requests for private info has expired.",
      prompt:
        'You have no expired applications that had access to your Instagram account.',
    },
    {
      name: 'REMOVED',
      id: 2,
      text:
        "These are apps and websites you removed from your account. This means they may still have access to info you previously shared, but can't make additional requests for private info.",
      prompt:
        'You have no removed applications that had access to your Instagram account.',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <div className={styles.tabbar}>
          {tabs.map((elem, index) => {
            return <Tab name={elem.name} setCurrID={(e) => setCurrID(index)} />;
          })}
        </div>
        <div className={styles.chosen_tab}>
          <TabElem text={tabs[currID].text} prompt={tabs[currID].prompt} />
        </div>
      </div>
    </div>
  );
};

export default ManageAccess;
