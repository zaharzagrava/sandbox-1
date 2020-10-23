import React, { ReactElement } from 'react';

interface Props {
  children: React.ReactNode;
}

function FormError({ children }: Props): ReactElement {
  return <div style={{ color: 'red' }}>{children}</div>;
}

export default FormError;
