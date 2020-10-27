import React, { ReactElement } from 'react';

interface Props {
  children: React.ReactNode;
}

const FormError = ({ children }: Props) => {
  return <div style={{ color: 'red' }}>{children}</div>;
};

export default FormError;
