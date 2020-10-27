import React, { ReactElement } from 'react';

import styles from './Footer.module.scss';

interface Props {}

const Footer = ({}: Props) => {
  const links = [
    {
      name: 'ABOUT',
      uri: '',
    },
    {
      name: 'HELP',
      uri: '',
    },
    {
      name: 'PRESS',
      uri: '',
    },
    {
      name: 'API',
      uri: '',
    },
    {
      name: 'JOBS',
      uri: '',
    },
    {
      name: 'PRIVACY',
      uri: '',
    },
    {
      name: 'TERMS',
      uri: '',
    },
    {
      name: 'LOCATIONS',
      uri: '',
    },
    {
      name: 'TOP ACCOUNTS',
      uri: '',
    },
    {
      name: 'HASHTAGS',
      uri: '',
    },
    {
      name: 'LANGUAGE',
      uri: '',
    },
  ];

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {links.map((link, index) => {
          return (
            <li className={styles.link}>
              <a href="">{link.name}</a>
            </li>
          );
        })}
      </ul>
      <p className={styles.copyright}>© 2020 Instagram from Facebook</p>
    </div>
  );
};

export default Footer;
