import React from 'react';

import styles from './Tab.module.scss';

interface Props {
  name: string;
  setCurrID: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Tab = (props: Props) => {
  return (
    <div className={styles.tab} onClick={props.setCurrID}>
      {props.name}
    </div>
  );
};

export default Tab;
