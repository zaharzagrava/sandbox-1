import React, { ReactElement } from 'react';

import styles from './Login.module.scss';

interface Props {}

function Login({}: Props): ReactElement {
  return <div className={styles.container}></div>;
}

export default Login;
