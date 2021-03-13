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
  CommentCreateParams,
  CreateCommentResponse,
} from '../../interfaces/';
import { Client, ClientComment, Comment } from '../../db/models/';
import { PostComment } from '../../db/models/PostComment';

export default class CommentService {
  constructor() { }

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
    params: CommentCreateParams,
    accessTokenData: AccessTokenData,
    callback: Callback<CreateCommentResponse>
  ): Promise<void> {
    console.log('@create');
    const newComment = (await Comment.create<CommentModel>({
      full_text: body.full_text,
    })) as CommentModel & CommentDTO;

    await ClientComment.create<ClientCommentModel>({
      comment_id: newComment.id,
      client_id: accessTokenData.id,
      is_author: true,
    });

    await PostComment.create<PostCommentModel>({
      comment_id: newComment.id,
      post_id: params.post_id,
    });

    const author = (await Client.findOne<ClientModel>({
      where: {
        id: accessTokenData.id,
      },
    })) as any;

    console.log('@callback');
    console.log(newComment);

    callback(null, {
      id: newComment.id,
      full_text: newComment.full_text,
      createdAt: newComment.createdAt,
      updatedAt: newComment.updatedAt,
      author: author,
    });
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

    callback(null, updatedComment[0]);
  }
}
