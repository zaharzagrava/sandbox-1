import { NextFunction, Request, Response } from 'express';

import { ErrorType } from '../../interfaces/';
import ClientService from './service';
import ClientValidator from './validations';

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
      next(error);
    }
  }
}
