import { NextFunction, Request, Response } from 'express';

import {
  CommentCreateParams,
  CommentGetDeleteUpdateParams,
} from '../../interfaces/';
import CommentService from './service';

export default class CommentController {
  constructor() {}

  static async getAll(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      await CommentService.getAll((error, data) => {
        if (error) {
          response.status(error.status).send(error);
          return;
        }

        response.status(200).json(data);
      });
    } catch (error) {
      next(error);
    }
  }

  static async get(request: Request, response: Response, next: NextFunction) {
    try {
      await CommentService.get(
        (request.params as unknown) as CommentGetDeleteUpdateParams,
        (error, data) => {
          if (error) {
            response.status(error.status).send(error);
            return;
          }

          response.status(200).json(data);
        }
      );
    } catch (error) {
      next(error);
    }
  }

  static async create(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      await CommentService.create(
        request.body,
        (request.query as unknown) as CommentCreateParams,
        response.locals.accessTokenData,
        (error, data) => {
          if (error) {
            response.status(error.status).send(error);
            return;
          }

          response.status(200).json(data);
        }
      );
    } catch (error) {
      next(error);
    }
  }

  static async delete(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      await CommentService.delete(
        (request.params as unknown) as CommentGetDeleteUpdateParams,
        (error, data) => {
          if (error) {
            response.status(error.status).send(error);
            return;
          }

          response.status(200).json(data);
        }
      );
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async update(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      await CommentService.update(
        (request.params as unknown) as CommentGetDeleteUpdateParams,
        request.body,
        (error, data) => {
          if (error) {
            response.status(error.status).send(error);
            return;
          }

          response.status(200).json(data);
        }
      );
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
