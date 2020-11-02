import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Header.module.scss';
import ClientImage from '../ClientImage/ClientImage';

interface Props {}

const Header = ({}: Props) => {
  const currUser = useSelector((state) => state.session.user);

  return (
    <div className={styles.container}>
      <div className={styles.input_container}>
        <h1 className={styles.header}>
          <NavLink to="/" className={styles.link}>
            Instagram
          </NavLink>
        </h1>
      </div>
      <div className={styles.input_container}>
        <input placeholder="Search" />
      </div>
      <div className={styles.icons_container}>
        <NavLink to="/" className={styles.home}>
          <FontAwesomeIcon icon="home" className={styles.icon} />
        </NavLink>
        <div>
          <FontAwesomeIcon icon="envelope" className={styles.icon} />
        </div>
        <div>
          <FontAwesomeIcon icon="compass" className={styles.icon} />
        </div>
        <div>
          <FontAwesomeIcon icon="heart" className={styles.icon} />
        </div>
        <NavLink to={`${currUser.id}`} className={styles.icon}>
          <ClientImage src={currUser.avatar} />
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
