import React from 'react';

import styles from './Tab.module.scss';

interface Props {
  name: string;
  setCurrID: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  isActive: boolean;
}

const Tab = (props: Props) => {
  return (
    <div
      className={`${styles.tab} ${props.isActive && styles.active_tab}`}
      onClick={props.setCurrID}
    >
      {props.name}
    </div>
  );
};

export default Tab;