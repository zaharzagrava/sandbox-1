import React from 'react';

import loadingLogo from '../../assets/icons/loading-logo.png';
import styles from './LoadingLogo.module.scss';

interface Props {}

const LoadingLogo = ({}: Props) => {
  return (
    <div className={styles.container}>
      <img src={loadingLogo} width={100} height={100} />
    </div>
  );
};

export default LoadingLogo;