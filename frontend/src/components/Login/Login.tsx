import React, { ReactElement } from 'react';
import Form from './Form/Form';

import styles from './Login.module.scss';
import RegisterPrompt from './RegisterPrompt/RegisterPrompt';

interface Props {}

const Login = (props: Props) => {
  return (
    <div className={styles.container}>
      <Form className={styles.form} />
      <RegisterPrompt className={styles.form} />
    </div>
  );
};

export default Login;
