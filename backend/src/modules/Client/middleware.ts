import { NextFunction, Request, Response } from 'express';
import ClientValidator from './validations';

export default class ClientMiddleware {
  constructor() {}

  static validateCreate(req: Request, res: Response, next: NextFunction) {
    ClientValidator.validateCreate(req.body, (error) => {
      if (error) {
        res.status(400).send(error);
      } else {
        next();
      }
    });
  }
}
