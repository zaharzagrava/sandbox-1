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
}

export interface CreateClientDTO {
  username: string;
  email: string;
  password: string;
}

/* comment */
export interface CommentDTO {
  id?: number;
  full_text: string;
}

export interface CreateCommentDTO {
  full_text: string;
}

/* post */
export interface PostDTO {
  id?: number;
  full_text: string;
}

export interface CreatePostDTO {
  full_text: string;
}

/* tag */
export interface TagDTO {
  id?: number;
  full_text: string;
}

export interface CreateTagDTO {
  full_text: string;
}

/* hashtag */
export interface HashtagDTO {
  id?: number;
  full_text: string;
}

export interface CreateHashtagDTO {
  full_text: string;
}

/* REST API Types*/

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
// SessionGet - no arguments
// SessionDelete - no arguments

export interface SessionPost {
  email: string;
  password: string;
}
