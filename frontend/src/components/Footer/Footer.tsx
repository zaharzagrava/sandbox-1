import React, { ReactElement } from 'react';

import styles from './Footer.module.scss';

interface Props {}

function Footer({}: Props): ReactElement {
  return (
    <ul className={styles.container}>
      <li>
        <a href="" className={styles.link}>
          ABOUT
        </a>
      </li>
      <li>
        <a href="" className={styles.link}>
          HELP
        </a>
      </li>
      <li>
        <a href="" className={styles.link}>
          PRESS
        </a>
      </li>
      <li>
        <a href="" className={styles.link}>
          API
        </a>
      </li>
      <li>
        <a href="" className={styles.link}>
          JOBS
        </a>
      </li>
      <li>
        <a href="" className={styles.link}>
          PRIVACY
        </a>
      </li>
      <li>
        <a href="" className={styles.link}>
          TERMS
        </a>
      </li>
      <li>
        <a href="" className={styles.link}>
          LOCATIONS
        </a>
      </li>
      <li>
        <a href="" className={styles.link}>
          TOP ACCOUNTS
        </a>
      </li>
      <li>
        <a href="" className={styles.link}>
          HASHTAGS
        </a>
      </li>
      <li>
        <a href="" className={styles.link}>
          LANGUAGE
        </a>
      </li>
    </ul>
  );
}

export default Footer;
