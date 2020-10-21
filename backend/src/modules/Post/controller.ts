import { NextFunction, Request, Response } from 'express';

import { PostGetDeleteUpdateParams } from '../../interfaces/';
import PostService from './service';

export default class PostController {
  constructor() {}

  static async getAll(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      await PostService.getAll((error, data) => {
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
      await PostService.get(
        (request.params as unknown) as PostGetDeleteUpdateParams,
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
      await PostService.create(request.body, (error, data) => {
        if (error) {
          response.status(error.status).send(error);
          return;
        }

        response.status(200).json(data);
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async delete(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      await PostService.delete(
        (request.params as unknown) as PostGetDeleteUpdateParams,
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
      await PostService.update(
        (request.params as unknown) as PostGetDeleteUpdateParams,
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
