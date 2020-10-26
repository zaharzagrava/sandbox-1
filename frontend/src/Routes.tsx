import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LoadingLogo from './components/LoadingLogo/LoadingLogo';
import Page from './components/Page/Page';
import Profile from './components/Profile/Profile';
import Settings from './components/Settings/Settings';
import { sessionActions } from './store/Session';
import ClientImage from './components/ClientImage/ClientImage';

interface Props {}

function Routes({}: Props): ReactElement {
  const currentUser = useSelector((state) => state.session.user);
  const loading = useSelector((state) => state.session.loading);
  const error = useSelector((state) => state.session.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sessionActions.getSession());
  }, []);

  if (loading)
    return (
      <Page>
        {/* <LoadingLogo /> */}
        <Header />
        <Settings />
        <Footer />
      </Page>
    );

  // For now, consider that error can happen only if the client is not logged in
  if (error)
    return (
      <Page>
        <Header />
        <Settings />
        <Footer />
      </Page>
    );

  return (
    <Page>
      <Header />
      <Switch>
        <Route path="/" exact component={Profile} />
        <Route path="/profile" exact component={Profile} />
      </Switch>
      <Footer />
    </Page>
  );
}

export default Routes;
