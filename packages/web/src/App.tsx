import React, { useEffect } from 'react';
import './App.css';
import { useSelector } from 'react-redux';

function App() {
  // @ts-ignore
  const clients = useSelector(state => state.clients);

  console.log('@clients');
  console.log(clients);
  // useEffect(() => {
  //   return () => {};
  // }, []);

  return <div></div>;
}

export default App;
