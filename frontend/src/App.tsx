import React from 'react';
import { useDispatch } from 'react-redux';
import { usersActions } from './store/Users';

function App() {
  const dispatch = useDispatch();

  return (
    <div>
      {/* <button onClick={() => dispatch(usersActions.getUser(1))}>
        Increment after 1 second
      </button>{' '}
      <button onClick={undefined}>Increment</button>{' '}
      <button onClick={undefined}>Decrement</button>
      <hr />
      <div>Clicked: {null} times</div> */}
    </div>
  );
}

export default App;
