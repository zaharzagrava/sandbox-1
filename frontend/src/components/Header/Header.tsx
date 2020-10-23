import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { usersActions } from '../../store/Users';

interface Props {}

function Header({}: Props): ReactElement {
  const dispatch = useDispatch();

  return (
    <>
      <button onClick={() => dispatch(usersActions.getUsers({ id: 3 }))}>
        LOAD
      </button>
      <div>Hello Header</div>
    </>
  );
}

export default Header;
