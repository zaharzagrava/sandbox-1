import {
  Callback,
  CreateComment,
  CommentGetDeleteUpdateParams,
  CommentModel,
  CommentUpdate,
  ClientCommentModel,
  CommentDTO,
  AccessTokenData,
  PostCommentModel,
  ClientModel,
} from '../../interfaces/';
import { Client, ClientComment, Comment } from '../../db/models/';
import { PostComment } from '../../db/models/PostComment';

export default class CommentService {
  constructor() {}

  static async get(
    params: CommentGetDeleteUpdateParams,
    callback: Callback<CommentModel>
  ): Promise<void> {
    const comment = (await Comment.findOne<CommentModel>({
      attributes: ['id', 'full_text'],
      where: {
        id: params.id,
      },
    })) as CommentModel & CommentDTO;

    if (!comment) {
      callback({
        status: 400,
        message: `Comment #${params.id} does not exist`,
      });
      return;
    }

    callback(null, comment);
  }

  static async getAll(callback: Callback<CommentModel[]>): Promise<void> {
    const comments = await Comment.findAll<CommentModel>();
    callback(null, comments);
  }

  static async create(
    body: CreateComment,
    accessTokenData: AccessTokenData,
    callback: Callback<CommentModel>
  ): Promise<void> {
    const newComment = (await Comment.create<CommentModel>({
      full_text: body.full_text,
      post_id: body.post_id,
    })) as CommentModel & CommentDTO;

    ClientComment.create<ClientCommentModel>({
      comment_id: newComment.id,
      client_id: accessTokenData.id,
      is_author: true,
    });

    PostComment.create<PostCommentModel>({
      comment_id: newComment.id,
      post_id: body.post_id,
    });

    callback(null, newComment);
  }

  static async delete(
    params: CommentGetDeleteUpdateParams,
    callback: Callback<null>
  ): Promise<void> {
    const comment = await Comment.findOne<CommentModel>({
      where: {
        id: params.id,
      },
    });

    if (!comment) {
      callback({
        status: 400,
        message: `Comment #${params.id} does not exist`,
      });
      return;
    }

    await Comment.destroy<any>({
      where: {
        id: params.id,
      },
    });

    callback(null, null);
  }

  static async update(
    params: CommentGetDeleteUpdateParams,
    body: CommentUpdate,
    callback: Callback<CommentModel>
  ): Promise<void> {
    const comment = await Comment.findOne<CommentModel>({
      where: {
        id: params.id,
      },
    });

    if (!comment) {
      callback({
        status: 400,
        message: `Comment #${params.id} does not exist`,
      });
      return;
    }

    const [_, updatedComment] = await Comment.update<CommentModel>(body, {
      where: {
        id: params.id,
      },
      returning: true,
    });

    console.log(JSON.stringify(updatedComment[0]));

    callback(null, updatedComment[0]);
  }
}
