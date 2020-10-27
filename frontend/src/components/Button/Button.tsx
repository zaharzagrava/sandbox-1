import React from 'react';

import styles from './Button.module.scss';

interface Props {
  children: React.ReactNode;
  type: 'button' | 'reset' | 'submit';
  variant?: 'second';
}

const Button = ({ children, type, variant }: Props) => {
  let variantStyle = styles.btn;
  if (variant === 'second') variantStyle = styles.btn_second;

  return (
    <button type={type} className={variantStyle}>
      {children}
    </button>
  );
};

export default Button;
