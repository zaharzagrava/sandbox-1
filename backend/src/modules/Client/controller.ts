import { NextFunction, Request, Response } from 'express';

import { ClientGetDeleteUpdateParams, ErrorType } from '../../interfaces/';
import ClientService from './service';

export default class ClientController {
  constructor() {}

  static async getAll(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      await ClientService.getAll((error, data) => {
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
      await ClientService.get(
        (request.params as unknown) as ClientGetDeleteUpdateParams,
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
      await ClientService.create(request.body, (error, data) => {
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
      await ClientService.delete(
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
      await ClientService.update(
        response.locals.accessTokenData,
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
