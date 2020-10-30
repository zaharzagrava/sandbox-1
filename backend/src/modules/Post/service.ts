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
          model: Comment,
          include: [
            {
              model: Client,
              required: true,
              through: { where: { is_author: true } },
            },
          ],
        },
        {
          model: Client,
          required: true,
          through: { where: { is_author: true } },
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

    const commentsData: any = [];
    for (let i = 0; i < post.comments.length; i++) {
      const comment = post.comments[i];

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
    callback: Callback<GetPostResponse[]>
  ): Promise<void> {
    const sequelizeParams: any = {};

    sequelizeParams.include = [
      {
        model: Comment,
        include: [
          {
            model: Client,
            required: true,
            through: { where: { is_author: true } },
          },
        ],
      },
      {
        model: Client,
        required: true,
        through: { where: { is_author: true } },
      },
    ];

    if (params.client_id) {
      sequelizeParams.include[1].through.where.client_id = Number(
        params.client_id
      );
    }

    const posts = (await Post.findAll<PostModel>(sequelizeParams)) as any;

    const postsResponse = [];
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];

      const commentsData: any = [];
      for (let i = 0; i < post.comments.length; i++) {
        const comment = post.comments[i];

        commentsData.push({
          id: comment.id,
          full_text: comment.full_text,
          author: comment.clients[0],
        });
      }

      postsResponse.push({
        id: post.id,
        full_text: post.full_text,
        multimedia: post.multimedia,
        updatedAt: post.updatedAt,
        createdAt: post.createdAt,
        author: post.clients[0],
        comments: commentsData,
      });
    }

    callback(null, postsResponse);
  }

  static async create(
    body: CreatePost,
    accessTokenData: AccessTokenData,
    callback: Callback<PostModel>
  ): Promise<void> {
    console.log('body');
    console.log(body);

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
