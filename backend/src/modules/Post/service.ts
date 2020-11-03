import { promises as fsPromises } from 'fs';
import path from 'path';

import {
  AccessTokenData,
  Callback,
  ClientPostModel,
  CreatePost,
  GetPostResponse,
  PostDTO,
  PostGetDeleteUpdateParams,
  PostModel,
  PostUpdate,
  PostGetAllParams,
} from '../../interfaces/';
import { Client, ClientPost, Comment, Post } from '../../db/models/';

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
    const newPost = (await Post.create<PostModel>({
      full_text: body.full_text,
      multimedia: body.multimedia,
    })) as PostModel & PostDTO;

    await ClientPost.create<ClientPostModel>({
      post_id: newPost.id,
      client_id: accessTokenData.id,
      is_author: true,
    });

    if (body.multimedia) {
      const multimediaDir = `./public/uploads/${
        process.env.NODE_ENV || 'development'
      }/posts/${newPost.id}/multimedia`;

      try {
        await fsPromises.mkdir(path.resolve(multimediaDir), {
          recursive: true,
        });

        const fileNames = await fsPromises.readdir(multimediaDir);

        // unlink and rename can run in parallel because of uniqueness of uuid
        for (let i = 0; i < fileNames.length; i++) {
          const fileName = fileNames[i];
          fsPromises.unlink(path.join(multimediaDir, fileName));
        }

        for (let i = 0; i < body.multimedia.length; i++) {
          const multimediaElem = body.multimedia[i];

          fsPromises.rename(
            path.resolve(`./public/uploads/tmp/${multimediaElem}`),
            path.join(multimediaDir, multimediaElem)
          );
        }
      } catch (error) {
        console.log('@error');
        console.log(error);
      }
    }

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
    const post = (await Post.findOne<PostModel>({
      where: {
        id: params.id,
      },
    })) as PostModel & PostDTO;

    if (!post) {
      callback({
        status: 400,
        message: `Post #${params.id} does not exist`,
      });
      return;
    }

    if (body.multimedia) {
      const multimediaDir = `./public/uploads/${
        process.env.NODE_ENV || 'development'
      }/posts/${post.id}/multimedia`;

      try {
        const fileNames = await fsPromises.readdir(multimediaDir);

        // unlink and rename can run in parallel because of uniqueness of uuid
        for (let i = 0; i < fileNames.length; i++) {
          const fileName = fileNames[i];
          fsPromises.unlink(path.join(multimediaDir, fileName));
        }

        for (let i = 0; i < body.multimedia.length; i++) {
          const multimediaElem = body.multimedia[i];

          fsPromises.rename(
            path.resolve(`./public/uploads/tmp/${multimediaElem}`),
            path.join(multimediaDir, multimediaElem)
          );
        }
      } catch (error) {
        console.log('@error');
        console.log(error);
      }
    }

    const [_, updatedPost] = (await Post.update<PostModel>(body, {
      where: {
        id: params.id,
      },
      returning: true,
    })) as [number, (PostModel & PostDTO)[]];

    callback(null, updatedPost[0]);
  }
}
