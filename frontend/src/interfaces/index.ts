/* Profile Tabs */
export enum ProfileTabs {
  POSTS = 'POSTS',
  IGTV = 'IGTV',
  TAGGED = 'TAGGED',
  SAVED = 'SAVED',
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
  EMAILS_SENT = '/accounts/emails/sent',
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

/* comment */
export interface CommentDTO {
  id?: number;
  full_text: string;
  updatedAt?: Date;
  createdAt?: Date;

  author: ClientDTO;
}

export interface CommentCreate {
  full_text: string;
}

/* post */
export interface PostDTO {
  id?: number;
  full_text: string;
  multimedia: string[];
  updatedAt?: Date;
  createdAt?: Date;

  author: ClientDTO;
}

export interface PostCreate {
  full_text?: string;
  multimedia: FileList | null;
}

/* tag */
export interface TagDTO {
  id?: number;
  full_text: string;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface CreateTagDTO {
  full_text: string;
}

/* hashtag */
export interface HashtagDTO {
  id?: number;
  full_text: string;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface CreateHashtagDTO {
  full_text: string;
}

/* REST API Types*/

/* Client */
export interface ClientGetDeleteUpdateParams {
  id: number;
}

export interface ClientUpdate {
  id: number;
  full_name?: string;
  username?: string;
  website?: string;
  bio?: string;
  avatar?: File;
  email?: string;
  phone_number?: string;
  gender?: string;
}

export interface ClientUpdatePassword {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}

export interface ClientCreate {
  email: string;
  full_name: string;
  username: string;
  password: string;
}

/* Post */
export interface PostGetDeleteUpdateParams {
  id: number;
}

export type PostUpdate = Partial<PostDTO>;

/* Comment */
export interface CommentGetDeleteUpdateParams {
  id: number;
}

export type CommentUpdate = Partial<CommentDTO>;

/* Session */
// SessionGet - no arguments
// SessionDelete - no arguments

export interface SessionPost {
  email: string;
  password: string;
}