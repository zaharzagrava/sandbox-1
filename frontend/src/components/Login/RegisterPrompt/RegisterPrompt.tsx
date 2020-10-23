import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  className: string;
}

const RegisterPrompt = (props: Props) => {
  return (
    <div>
      Don't have an account? <NavLink to="/signup">Sign up</NavLink>{' '}
    </div>
  );
};

export default RegisterPrompt;
