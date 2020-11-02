import React from 'react';

import styles from './TabElem.module.scss';

interface Props {
  text: string;
  prompt: string;
}

const TabElem = ({ text, prompt }: Props) => {
  return (
    <>
      <p className={styles.text}>{text}</p>
      <p className={styles.prompt}>{prompt}</p>
    </>
  );
};

export default TabElem;
