import React from 'react';

import defaultClientImage from '../../assets/images/default-client-avatar.jpg';
import styles from './ClientImage.module.scss';

const API_URL = `http://localhost:4000`;

interface Props {
  src?: string;
}

const ClientImage = ({ src }: Props) => {
  const avatarURL = src ? `${API_URL}${src}` : defaultClientImage;
  return (
    <img
      src={avatarURL}
      alt=""
      width={'100%'}
      height={'100%'}
      className={styles.img}
    />
  );
};

export default ClientImage;
