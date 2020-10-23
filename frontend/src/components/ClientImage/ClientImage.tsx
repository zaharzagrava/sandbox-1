import React from 'react';

import defaultClientImage from './default-client-image.jpg';
import styles from './ClientImage.module.scss';

interface Props {
  src?: string;
  width?: number;
  height?: number;
}

const ClientImage = ({ src, width, height }: Props) => {
  // const defaultClientImageURL = '/images/defaultClientImage'

  return (
    <img
      src={src || defaultClientImage}
      alt=""
      width={'100%'}
      height={'100%'}
      className={styles.img}
    />
  );
};

export default ClientImage;
