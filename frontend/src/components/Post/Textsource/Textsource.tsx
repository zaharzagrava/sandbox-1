import React from 'react';

import styles from './Textsource.module.scss';
import { ClientDTO } from '../../../interfaces';
import ClientImage from '../../ClientImage/ClientImage';

interface Props {
  author: ClientDTO;
  full_text: string;
}

const Textsource = ({ author, full_text }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.client_image}>
        <ClientImage src={author.avatar} />
      </div>
      <div className={styles.full_text_container}>
        <a className={styles.username} href="">
          {author.username}
        </a>
        <span className={styles.full_text} style={{ display: 'inline' }}>
          {full_text}
        </span>
      </div>
    </div>
  );
};

export default Textsource;
