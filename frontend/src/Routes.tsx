import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LoadingLogo from './components/LoadingLogo/LoadingLogo';
import Login from './components/Login/Login';
import Page from './components/Page/Page';
import Profile from './components/Profile/Profile';
import Register from './components/Register/Register';
import { sessionActions } from './store/Session';

interface Props {}

function Routes({}: Props): ReactElement {
  const currentUser = useSelector((state) => state.session.user);
  const loading = useSelector((state) => state.session.loading);
  const error = useSelector((state) => state.session.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sessionActions.getSession());
  }, []);

  if (loading) return <LoadingLogo />;

  // For now, consider that error can happen only if the client is not logged in
  if (error)
    return (
      <Page>
        <Login />
        <Footer />
      </Page>
    );

  return (
    <Page>
      <Header />
      <Switch>
        <Route path="/" exact component={Profile} />
      </Switch>
      <Footer />
    </Page>
  );
}

export default Routes;
