import React from 'react';
import { ClientDTO } from '../../../interfaces';

import styles from './ClientInfo.module.scss';
import ClientImage from '../../ClientImage/ClientImage';

interface Props {
  client: ClientDTO;
}

const ClientInfo = ({ client }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.client_image_container}>
        <div className={styles.client_image}>
          <ClientImage />
        </div>
      </div>

      <div className={styles.client_info}>
        <div className={styles.client_info_row}>
          <h1 className={styles.client_info_username}>{client.username}</h1>
          <button className={styles.btn}>Follow</button>
        </div>
        <div className={styles.client_info_row}>
          <ul className={styles.stats}>
            <li>3454 posts</li>
            <li>80m followers</li>
            <li>1511 following</li>
          </ul>
        </div>
        <div>
          <div className={styles.username}>{client.username}</div>
          <div className={styles.bio}>{client.bio}</div>
          <a
            href={`//${client.website}`}
            target="_blank"
            className={styles.website}
          >
            {client.website}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ClientInfo;
