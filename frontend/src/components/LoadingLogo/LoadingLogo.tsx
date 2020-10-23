import React, { ReactElement } from 'react';

import loadingLogo from './loading-logo.png';
import styles from './LoadingLogo.module.scss';

interface Props {}

function LoadingLogo({}: Props): ReactElement {
  return (
    <div className={styles.container}>
      <img src={loadingLogo} width={100} height={100} />
    </div>
  );
}

export default LoadingLogo;
