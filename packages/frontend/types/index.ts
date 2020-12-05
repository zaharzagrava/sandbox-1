/* Profile Tabs */
export enum ProfileTabs {
  POSTS = 'POSTS',
  IGTV = 'IGTV',
  TAGGED = 'TAGGED',
  SAVED = 'SAVED'
}

export type RequestStatus = 'none' | 'processing' | 'failure' | 'success';

/* Routes */
export enum RouteURLs {
  ACCOUNTS_EDIT = '/accounts/edit',
  PASSWORD_CHANGE = '/accounts/password/change',
  MANAGE_ACCESS = '/accounts/manage_access',
  EMAILS_SETTINGS = '/accounts/emails',
  PUSH_NOTIFICATIONS = '/accounts/push_notifications',
  CONTACT_HISTORY = '/accounts/contact_history',
  PRIVACY_AND_SECURITY = '/accounts/privacy_and_security',
  EMAILS_SENT = '/accounts/emails/sent'
}

/* Server data types */
export interface ClientDTO {
  id: number;
  full_name?: string;
  username?: string;
  website?: string;
  bio?: string;
  avatar?: string;
  email?: string;
  phone_number?: string;
  gender?: string;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface GetClientMyselfArgs {
  id: string;
}
