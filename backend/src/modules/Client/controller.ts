import { Request, Response } from 'express';

import ClientService from './service';

export default class ClientController {
  constructor() {}

  static async getAll(request: Request, response: Response) {
    try {
      await ClientService.getAll((error: any, data: any) => {
        if (error) {
          return response.status(error.status).send(error);
        }

        return response.status(200).json(data);
      });
    } catch (error) {
      console.log(error);
    }
  }
}
