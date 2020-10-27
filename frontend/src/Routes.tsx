import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';
import { useHistory } from 'react-router-dom';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LoadingLogo from './components/LoadingLogo/LoadingLogo';
import Page from './components/Page/Page';
import Profile from './components/Profile/Profile';
import Settings from './components/Settings/Settings';
import { sessionActions } from './store/Session';
import ClientImage from './components/ClientImage/ClientImage';
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
        <LoadingLogo />
      </Page>
    );

  if (error && !error.message.includes(`"accessToken" is required`))
    return (
      <Page>
        <div>{error.message}</div>
      </Page>
    );

  // if (error) {
  //   // Redirects for unauthorized user

  //   for (let i = 0; i < privateURLs.length; i++) {
  //     const regex = privateURLs[i];

  //     if (regex.test(window.location.href)) {
  //       history.push('/');
  //       return (
  //         <Page>
  //           <LoadingLogo />
  //         </Page>
  //       );
  //     }
  //   }
  // } else {
  //   // Redirects for authorized user

  //   if (window.location.href === '/signup') {
  //     history.push('/');
  //     return (
  //       <Page>
  //         <LoadingLogo />
  //       </Page>
  //     );
  //   }
  // }

  return (
    <Page>
      <Header />
      <Switch>
        {/* {error && <Route path="/" exact component={Login} />} */}
        {/* {!error && <Route path="/" exact component={PostList} />} */}
        <Route path="/" exact component={PostList} />

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
