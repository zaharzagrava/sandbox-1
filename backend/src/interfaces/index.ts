import { number } from 'joi';
import { Model, Optional } from 'sequelize';

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
  POSTS_COMMENTS = 'posts_comments',
}

/* Client */

// What backend receives from db
export interface ClientDTO {
  id: number;
  full_name: string | null;
  username: string;
  website: string | null;
  bio: string | null;
  avatar: string | null;
  email: string;
  phone_number: string | null;
  gender: string | null;
  password: () => string;
  updatedAt: Date;
  createdAt: Date;
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

/* Comment */

// What backend receives from db
export interface CommentDTO {
  id: number;
  full_text: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface CommentRD {
  clients: ClientDTO[];
  posts: PostDTO[];
}

export interface CreateComment {
  id?: number;
  full_text: string;

  post_id: number;
}

export enum CommentFieldNames {
  ID = 'id',
  FULL_TEXT = 'full_text',
}

/* Post */

// What backend receives from db
export interface PostDTO {
  id: number;
  full_text: string | null;
  multimedia: string[];
  updatedAt: Date;
  createdAt: Date;
}

export interface PostRD {
  clients: ClientDTO[];
  comments: PostDTO[];
}

export interface CreatePost {
  id?: number;
  full_text: string | null;
  multimedia: string[];
}

export enum PostFieldNames {
  ID = 'id',
  FULL_TEXT = 'full_text',
}

/* Tag */

// What backend receives from db
export interface TagDTO {
  id: number;
  full_text: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface CreateTag {
  id?: number;
  full_text: string;
}

export enum TagFieldNames {
  ID = 'id',
  FULL_TEXT = 'full_text',
}

/* Hashtag */

// What backend receives from db
export interface HashtagDTO {
  id: number;
  full_text: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface CreateHashtag {
  id?: number;
  full_text: string;
}

export enum HashtagFieldNames {
  ID = 'id',
  FULL_TEXT = 'full_text',
}

/* ClientComment */

// What backend receives from db
export interface ClientCommentDTO {
  id: number;
  client_id: number;
  comment_id: number;
  is_liked: boolean | null;
  is_author: boolean | null;
  updatedAt: Date;
  createdAt: Date;
}

export interface CreateClientComment {
  client_id: number;
  comment_id: number;
  is_author: boolean;
}

/* ClientPost */

// What backend receives from db
export interface ClientPostDTO {
  id: number;
  client_id: number;
  post_id: number;
  is_liked: boolean | null;
  is_author: boolean | null;
  updatedAt: Date;
  createdAt: Date;
}

export interface CreateClientPost {
  client_id: number;
  post_id: number;
  is_author: boolean;
}

/* PostComment */

// What backend receives from db
export interface PostCommentDTO {
  id: number;
  post_id: number;
  comment_id: number;
  updatedAt: Date;
  createdAt: Date;
}

export interface CreatePostComment {
  post_id: number;
  comment_id: number;
}

export type ClientModel = Model<ClientDTO, CreateClientDTO>;
export type CommentModel = Model<CommentDTO, CreateComment>;
export type TagModel = Model<TagDTO, CreateTag>;
export type HashtagModel = Model<HashtagDTO, CreateHashtag>;
export type PostModel = Model<PostDTO, CreatePost>;

export type ClientCommentModel = Model<ClientCommentDTO, CreateClientComment>;
export type ClientPostModel = Model<ClientPostDTO, CreateClientPost>;
export type PostCommentModel = Model<PostCommentDTO, CreatePostComment>;

/* Client */
export interface ClientGetDeleteUpdateParams {
  id: number;
}

export type ClientUpdate = Partial<ClientDTO>;

/* Post */
export interface PostGetAllParams {
  client_id: number;
}

export interface PostGetDeleteUpdateParams {
  id: number;
}

export type PostUpdate = Partial<PostDTO>;

export interface GetPostResponse {
  id: number;
  full_text: string | null;
  multimedia: string[];
  updatedAt: Date;
  createdAt: Date;

  author: ClientDTO;
  comments: {
    id: number;
    full_text: string;
    author: ClientDTO;
  }[];
}

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
