import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Tab.module.scss';

interface Props {
  name: string;
  url: string;
}

const Tab = (props: Props) => {
  return (
    <NavLink to={props.url}>
      <div className={styles.tab}>{props.name}</div>
    </NavLink>
  );
};

export default Tab;
