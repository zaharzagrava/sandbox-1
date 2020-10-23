import React from 'react';
import { usersActions } from './store/Users';

// --- Importing CSS / Icons
import './utils/reset.scss';
import './utils/global.scss';
import './components/FontawesomeIcons/FontawesomeIcons';

// --- Importing Redux
import { Provider } from 'react-redux';
import { store } from './store/';
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
