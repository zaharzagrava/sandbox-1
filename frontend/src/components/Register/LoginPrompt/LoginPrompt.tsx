import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './LoginPrompt.module.scss';

interface Props {
  className: string;
}

const LoginPrompt = ({}: Props) => {
  return (
    <div className={styles.container}>
      Have an account? <NavLink to="/">Log in</NavLink>{' '}
    </div>
  );
};

export default LoginPrompt;
