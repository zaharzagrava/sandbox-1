import React, { ReactElement } from 'react';

import styles from './Footer.module.scss';

interface Props {}

function Footer({}: Props): ReactElement {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li className={styles.link}>
          <a href="">ABOUT</a>
        </li>
        <li className={styles.link}>
          <a href="">HELP</a>
        </li>
        <li className={styles.link}>
          <a href="">PRESS</a>
        </li>
        <li className={styles.link}>
          <a href="">API</a>
        </li>
        <li className={styles.link}>
          <a href="">JOBS</a>
        </li>
        <li className={styles.link}>
          <a href="">PRIVACY</a>
        </li>
        <li className={styles.link}>
          <a href="">TERMS</a>
        </li>
        <li className={styles.link}>
          <a href="">LOCATIONS</a>
        </li>
        <li className={styles.link}>
          <a href="">TOP ACCOUNTS</a>
        </li>
        <li className={styles.link}>
          <a href="">HASHTAGS</a>
        </li>
        <li className={styles.link}>
          <a href="">LANGUAGE</a>
        </li>
      </ul>{' '}
      <p className={styles.copyright}>© 2020 Instagram from Facebook</p>
    </div>
  );
}

export default Footer;
