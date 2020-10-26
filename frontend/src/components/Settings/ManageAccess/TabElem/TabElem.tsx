import React from 'react';

import styles from './TabElem.module.scss';

interface Props {
  text: string;
  prompt: string;
}

const TabElem = (props: Props) => {
  return (
    <>
      <p className={styles.text}>{props.text}</p>
      <p className={styles.prompt}>{props.prompt}</p>
    </>
  );
};

export default TabElem;
