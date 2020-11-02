import React from 'react';
import { Route, Switch } from 'react-router';

import { RouteURLs } from '../../interfaces';
import ContactHistory from './ContactHistory/ContactHistory';
import Edit from './Edit/Edit';
import Emails from './Emails/Emails';
import EmailsSent from './EmailsSent/EmailsSent';
import ManageAccess from './ManageAccess/ManageAccess';
import PasswordChange from './PasswordChange/PasswordChange';
import PrivacyAndSecurity from './PrivacyAndSecurity/PrivacyAndSecurity';
import PushNotifications from './PushNotifications/PushNotifications';
import styles from './Settings.module.scss';
import Tab from './Tab/Tab';

interface Props {}

const Settings = ({}: Props) => {
  const tabs = [
    {
      name: 'Edit Profile',
      url: RouteURLs.ACCOUNTS_EDIT,
      component: Edit,
    },
    {
      name: 'Change Password',
      url: RouteURLs.PASSWORD_CHANGE,
      component: PasswordChange,
    },
    {
      name: 'Apps and Websites',
      url: RouteURLs.MANAGE_ACCESS,
      component: ManageAccess,
    },
    {
      name: 'Email and SMS',
      url: RouteURLs.EMAILS_SETTINGS,
      component: Emails,
    },
    {
      name: 'Push Notifications',
      url: RouteURLs.PUSH_NOTIFICATIONS,
      component: PushNotifications,
    },
    {
      name: 'Manage Contacts',
      url: RouteURLs.CONTACT_HISTORY,
      component: ContactHistory,
    },
    {
      name: 'Privacy and Security',
      url: RouteURLs.PRIVACY_AND_SECURITY,
      component: PrivacyAndSecurity,
    },
    {
      name: 'Emails from Instagram',
      url: RouteURLs.EMAILS_SENT,
      component: EmailsSent,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <div className={styles.tabbar}>
          {tabs.map((elem) => {
            return <Tab name={elem.name} url={elem.url} key={elem.name} />;
          })}
        </div>
        <div className={styles.chosen_tab}>
          <Switch>
            {tabs.map((elem) => {
              return (
                <Route
                  path={elem.url}
                  exact
                  component={elem.component}
                  key={elem.name}
                />
              );
            })}
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Settings;
