import React, { ReactElement } from 'react';
import Form from './Form/Form';

import styles from './Login.module.scss';
import RegisterPrompt from './RegisterPrompt/RegisterPrompt';

interface Props {}

const Login = ({}: Props) => {
  return (
    <div className={styles.container}>
      <Form />
      <RegisterPrompt />
    </div>
  );
};

export default Login;
