import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { useHistory } from 'react-router-dom';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LoadingLogo from './components/LoadingLogo/LoadingLogo';
import Page from './components/Page/Page';
import Profile from './components/Profile/Profile';
import Settings from './components/Settings/Settings';
import { sessionActions } from './store/Session';
import PostList from './components/PostList/PostList';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import PostGrid from './components/PostGrid/PostGrid';
import PostPage from './components/PostPage/PostPage';
import { ProfileTabs } from './interfaces';

interface Props {}

const privateURLs = [/\/accounts.*/g, /explore\//g, /direct\/inbox/g];

function Routes({}: Props): ReactElement {
  const history = useHistory();

  const loading = useSelector(
    (state) => state.session.loadings.GET_SESSION_REQUEST
  );
  const error = useSelector(
    (state) => state.session.errors.GET_SESSION_REQUEST
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sessionActions.getSession());
  }, []);

  useEffect(() => {
    if (loading) return;

    if (error) {
      // Redirects for unauthorized user
      for (let i = 0; i < privateURLs.length; i++) {
        const regex = privateURLs[i];

        if (regex.test(window.location.href)) {
          history.push('/');
        }
      }
    } else {
      // Redirects for authorized user
      if (
        window.location.href.includes('/signup') ||
        window.location.href.includes('/login')
      ) {
        history.push('/');
      }
    }
  }, [loading, error]);

  if (loading)
    return (
      <Page>
        <LoadingLogo />
      </Page>
    );

  return (
    <Page>
      {!error && <Header />}
      <Switch>
        {error && <Route path="/" exact component={Login} />}
        {!error && <Route path="/" exact component={PostList} />}

        <Route
          path="/p/:postid"
          render={(props) => {
            return <PostPage id={props.match.params.postid} />;
          }}
        />

        <Route path="/accounts" component={Settings} />
        <Route path="/signup" exact component={Register} />
        {/* <Route path="/direct/inbox" exact component={PostGrid} /> */}
        <Route path="/explore" exact component={PostGrid} />

        <Route
          path="/:userid/:tab"
          render={(props) => {
            return (
              <Profile
                id={props.match.params.userid}
                tab={props.match.params.tab}
              />
            );
          }}
        />

        <Route
          path="/:userid"
          render={(props) => {
            return (
              <Profile id={props.match.params.userid} tab={ProfileTabs.POSTS} />
            );
          }}
        />
      </Switch>
      <Footer />
    </Page>
  );
}

export default Routes;
