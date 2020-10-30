import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Tab.module.scss';

interface Props {
  name: string;
  url: string;
}

const Tab = ({ name, url }: Props) => {
  return (
    <NavLink to={url}>
      <div
        className={`${styles.tab} ${
          window.location.href.includes(url) && styles.active_tab
        }`}
      >
        {name}
      </div>
    </NavLink>
  );
};

export default Tab;
