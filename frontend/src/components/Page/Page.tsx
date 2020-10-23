import React from 'react';

import styles from './Page.module.scss';

interface Props {
  children: React.ReactNode;
}

const Page = ({ children }: Props) => {
  return <div className={styles.container}>{children}</div>;
};

export default Page;
