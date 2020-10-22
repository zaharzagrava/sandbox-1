import { Model, Optional } from 'sequelize';

// export interface ClientDT {
//   id: number;
//   full_name: string;
//   username: string;
//   website: string;
//   bio: string;
//   email: string;
//   phone_number: string;
//   gender: string;
//   password: string;
//   confirmed_at?: Date;
// }

// export interface TaskDT {
//   id: number;
//   title: string;
//   task_description: string;
//   is_done: boolean;
//   task_priority: number;
//   due_date: Date;
// }

// export interface CookiesDT {
//   idToken: string;
// }

export interface ErrorType {
  status: number;
  message: string;
}

export type Callback<T> = (error: ErrorType | null, data?: T) => void;

type NonAbstract<T> = { [P in keyof T]: T[P] }; // "abstract" gets lost here
type Constructor<T> = new () => T;
export type NonAbstractTypeOfModel<T> = Constructor<T> &
  NonAbstract<typeof Model>;

export enum TableNames {
  CLIENTS = 'clients',
  COMMENTS = 'comments',
  POSTS = 'posts',
  HASHTAGS = 'hashtags',
  TAGS = 'tags',
  HASHTAGS_TEXTSOURCES = 'hashtags_textsources',
  TAGS_TEXTSOURCES = 'tags_textsources',
  CLIENTS_POSTS = 'clients_posts',
  CLIENTS_COMMENTS = 'clients_comments',
}

/* client */
export interface ClientDTO {
  id: number;
  full_name: string;
  username: string;
  website: string;
  bio: string;
  avatar: string;
  email: string;
  phone_number: string;
  gender: string;
  password: () => string;
}

export interface CreateClientDTO {
  id?: number;
  full_name?: string;
  username: string;
  website?: string;
  bio?: string;
  avatar?: string;
  email: string;
  phone_number?: string;
  gender?: string;
  password: string;
}

export enum ClientFieldNames {
  ID = 'id',
  FULL_NAME = 'full_name',
  USERNAME = 'username',
  WEBSITE = 'website',
  BIO = 'bio',
  AVATAR = 'avatar',
  EMAIL = 'email',
  PHONE_NUMBER = 'phone_number',
  GENDER = 'gender',
  PASSWORD = 'password',
}

/* comment */
export interface CommentDTO {
  id: number;
  full_text: string;
}

export interface CreateCommentDTO {
  id?: number;
  full_text: string;
}

export enum CommentFieldNames {
  ID = 'id',
  FULL_TEXT = 'full_text',
}

/* post */
export interface PostDTO {
  id: number;
  full_text: string;
}

export interface CreatePostDTO {
  id?: number;
  full_text: string;
}

export enum PostFieldNames {
  ID = 'id',
  FULL_TEXT = 'full_text',
}

/* tag */
export interface TagDTO {
  id: number;
  full_text: string;
}

export interface CreateTagDTO {
  id?: number;
  full_text: string;
}

export enum TagFieldNames {
  ID = 'id',
  FULL_TEXT = 'full_text',
}

/* hashtag */
export interface HashtagDTO {
  id: number;
  full_text: string;
}

export interface CreateHashtagDTO {
  id?: number;
  full_text: string;
}

export enum HashtagFieldNames {
  ID = 'id',
  FULL_TEXT = 'full_text',
}

export type ClientModel = Model<ClientDTO, CreateClientDTO>;
export type CommentModel = Model<CommentDTO, CreateCommentDTO>;
export type TagModel = Model<TagDTO, CreateTagDTO>;
export type HashtagModel = Model<HashtagDTO, CreateHashtagDTO>;
export type PostModel = Model<PostDTO, CreatePostDTO>;

/* --- Client REST API Arguments --- */

/* Client */
export interface ClientGetDeleteUpdateParams {
  id: number;
}

export type ClientUpdate = Partial<ClientDTO>;

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
export interface SessionLogin {
  email: string;
  password: string;
}

export interface AccessTokenData {
  id: number;
  email: string;
}
