import {
  AccessTokenData,
  Callback,
  ClientPostModel,
  CreatePost,
  PostDTO,
  PostGetDeleteUpdateParams,
  PostModel,
  PostUpdate,
} from '../../interfaces/';
import { ClientPost, Post } from '../../db/models/';

export default class PostService {
  constructor() {}

  static async get(
    params: PostGetDeleteUpdateParams,
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

    callback(null, post);
  }

  static async getAll(callback: Callback<PostModel[]>): Promise<void> {
    const posts = await Post.findAll<PostModel>();
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
