import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './RegisterPrompt.module.scss';

interface Props {}

const RegisterPrompt = ({}: Props) => {
  return (
    <div className={styles.container}>
      Don't have an account? <NavLink to="/signup">Sign up</NavLink>{' '}
    </div>
  );
};

export default RegisterPrompt;
