import {
  AccessTokenData,
  Callback,
  ClientPostModel,
  CommentDTO,
  CommentModel,
  CommentRD,
  CreatePost,
  GetPostResponse,
  PostDTO,
  PostGetDeleteUpdateParams,
  PostModel,
  PostUpdate,
  ClientDTO,
  PostRD,
  PostGetAllParams,
} from '../../interfaces/';
import { Client, ClientPost, Comment, Post } from '../../db/models/';
import { Model } from 'sequelize/types';
import { required } from 'joi';

export default class PostService {
  constructor() {}

  static async get(
    params: PostGetDeleteUpdateParams,
    callback: Callback<GetPostResponse>
  ): Promise<void> {
    const post = (await Post.findOne<PostModel>({
      where: {
        id: params.id,
      },
      include: [
        {
          model: ClientPost,
          required: true,
          where: {
            is_author: true,
          },
        },
      ],
    })) as any;

    if (!post) {
      callback({
        status: 400,
        message: `Post #${params.id} does not exist`,
      });
      return;
    }

    const comments = (await Comment.findAll<CommentModel>({
      include: [
        {
          model: Post,
          required: true,
          where: {
            id: post.id,
          },
        },
        {
          model: Client,
          required: true,
        },
      ],
    })) as any;

    const commentsData: any = [];
    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];

      commentsData.push({
        id: comment.id,
        full_text: comment.full_text,
        author: comment.clients[0],
      });
    }

    callback(null, {
      id: post.id,
      full_text: post.full_text,
      multimedia: post.multimedia,
      updatedAt: post.updatedAt,
      createdAt: post.createdAt,
      author: post.clients[0],
      comments: commentsData,
    });
  }

  static async getAll(
    params: PostGetAllParams,
    callback: Callback<PostModel[]>
  ): Promise<void> {
    const sequelizeParams: any = {};

    if (params.client_id) {
      sequelizeParams.include = [
        {
          model: Client,
          required: true,
          through: { where: { client_id: params.client_id } },
        },
      ];
    }

    console.log('@params');
    console.log(params);

    const posts = await Post.findAll<PostModel>(sequelizeParams);

    callback(null, posts);
  }

  static async create(
    body: CreatePost,
    accessTokenData: AccessTokenData,
    callback: Callback<PostModel>
  ): Promise<void> {
    const newPost = (await Post.create<PostModel>({
      full_text: body.full_text,
      multimedia: body.multimedia,
    })) as PostModel & PostDTO;

    ClientPost.create<ClientPostModel>({
      post_id: newPost.id,
      client_id: accessTokenData.id,
      is_author: true,
    });

    callback(null, newPost);
  }

  static async delete(
    params: PostGetDeleteUpdateParams,
    callback: Callback<null>
  ): Promise<void> {
    const post = await Post.findOne<PostModel>({
      where: {
        id: params.id,
      },
    });

    if (!post) {
      callback({
        status: 400,
        message: `Post #${params.id} does not exist`,
      });
      return;
    }

    await Post.destroy<any>({
      where: {
        id: params.id,
      },
    });

    callback(null, null);
  }

  static async update(
    params: PostGetDeleteUpdateParams,
    body: PostUpdate,
    callback: Callback<PostModel>
  ): Promise<void> {
    const post = await Post.findOne<PostModel>({
      where: {
        id: params.id,
      },
    });

    if (!post) {
      callback({
        status: 400,
        message: `Post #${params.id} does not exist`,
      });
      return;
    }

    const [_, updatedPost] = await Post.update<PostModel>(body, {
      where: {
        id: params.id,
      },
      returning: true,
    });

    callback(null, updatedPost[0]);
  }
}
