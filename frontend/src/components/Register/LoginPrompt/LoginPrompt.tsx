import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  className: string;
}

const LoginPrompt = (props: Props) => {
  return (
    <div>
      Have an account? <NavLink to="/">Log in</NavLink>{' '}
    </div>
  );
};

export default LoginPrompt;
