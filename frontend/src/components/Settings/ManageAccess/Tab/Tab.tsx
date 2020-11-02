import React from 'react';

import styles from './Tab.module.scss';

interface Props {
  name: string;
  setCurrID: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  isActive: boolean;
}

const Tab = ({ isActive, name, setCurrID }: Props) => {
  return (
    <div
      className={`${styles.tab} ${isActive && styles.active_tab}`}
      onClick={setCurrID}
    >
      {name}
    </div>
  );
};

export default Tab;
