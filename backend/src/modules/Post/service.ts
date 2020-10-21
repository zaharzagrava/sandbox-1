import {
  Callback,
  CreatePostDTO,
  PostGetDeleteUpdateParams,
  PostModel,
  PostUpdate,
} from '../../interfaces/';
import { Post } from '../../db/models/';

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
    body: CreatePostDTO,
    callback: Callback<PostModel>
  ): Promise<void> {
    const newPost = await Post.create<PostModel>({
      full_text: body.full_text,
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

    console.log(JSON.stringify(updatedPost[0]));

    callback(null, updatedPost[0]);
  }
}
