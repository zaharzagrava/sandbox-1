import React from 'react';

import styles from './Tab.module.scss';

interface Props {
  name: string;
  setcurrTab: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  isActive: boolean;
}

const Tab = (props: Props) => {
  return (
    <div
      className={`${styles.tab} ${props.isActive && styles.active_tab}`}
      onClick={props.setcurrTab}
    >
      {props.name}
    </div>
  );
};

export default Tab;
