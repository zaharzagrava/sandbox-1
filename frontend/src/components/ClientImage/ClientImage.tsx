import React from 'react';

import defaultClientImage from '../../assets/images/default-client-avatar.jpg';
import styles from './ClientImage.module.scss';

interface Props {
  src?: string;
}

const ClientImage = ({ src }: Props) => {
  const avatarURL = src
    ? `http://localhost:4000/uploads/${src}`
    : defaultClientImage;
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
