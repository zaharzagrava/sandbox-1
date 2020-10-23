import React from 'react';

import styles from './Button.module.scss';

interface Props {
  children: React.ReactNode;
  type: 'button' | 'reset' | 'submit';
}

const Button = ({ children, type }: Props) => {
  return (
    <button type={type} className={styles.btn}>
      {children}
    </button>
  );
};

export default Button;
