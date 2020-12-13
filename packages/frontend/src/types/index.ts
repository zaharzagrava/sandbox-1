import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  '/login': undefined;
  '/register': undefined;
};

export type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, '/login'>;

/* Profile Tabs */
export enum ProfileTabs {
  POSTS = 'POSTS',
  IGTV = 'IGTV',
  TAGGED = 'TAGGED',
  SAVED = 'SAVED'
}

export interface RequestInfo {
  status: 'none' | 'processing' | 'error' | 'success';
}

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

/* Features Info */
export interface FeaturesInfo {
  get_session?: boolean;
  post_session_?: boolean;
  delete_session?: boolean;
  get_tables?: boolean;
  get_client_myself?: boolean;
  get_client_other?: boolean;
  get_clients_followers?: boolean;
  get_clients_close_friends?: boolean;
  get_clients_interesting_people?: boolean;
  get_clients_likers?: boolean;
  post_client_myself?: boolean;
  put_client?: boolean;
  delete_client?: boolean;
  get_posts_main_feed?: boolean;
  get_posts_bookmarked?: boolean;
  post_post?: boolean;
}

export interface GetClientMyselfArgs {
  id: string;
}
