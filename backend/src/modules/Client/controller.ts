import { NextFunction, Request, Response } from 'express';

import ClientService from './service';

export default class ClientController {
  constructor() {}

  static async getAll(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      // console.log('getAll');
      // await ClientService.getAll((error: any, data: any) => {
      //   if (error) {
      //     return response.status(error.status).send(error);
      //   }

      //   return response.status(200).json(data);
      // });

      throw new Error('TETSTEST');
    } catch (error) {
      next(error);
    }
  }
}
