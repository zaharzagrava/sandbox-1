import React from 'react';

import Form from './Form/Form';
import LoginPrompt from './LoginPrompt/LoginPrompt';
import styles from './Register.module.scss';

interface Props {}

const Register = ({}: Props) => {
  return (
    <div className={styles.container}>
      <Form className={styles.form} />
      <LoginPrompt className={styles.form} />
    </div>
  );
};

export default Register;
