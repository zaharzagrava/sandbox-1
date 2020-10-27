import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Header.module.scss';
import { usersActions } from '../../store/Users';
import ClientImage from '../ClientImage/ClientImage';

interface Props {}

const Header = ({}: Props) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.header}>
          <NavLink to="/">Instagram</NavLink>
        </h1>
      </div>
      <div>
        <input placeholder="Search" />
      </div>
      <div className={styles.icon_container}>
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
        <NavLink to="/test_user" className={styles.icon}>
          <ClientImage />
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
