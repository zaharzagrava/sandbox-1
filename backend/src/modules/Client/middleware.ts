import { NextFunction, Request, Response } from 'express';
import ClientValidator from './validations';

export default class ClientMiddleware {
  constructor() {}

  static validateGetDelete(req: Request, res: Response, next: NextFunction) {
    ClientValidator.validateGetDelete(req.params, (error) => {
      if (error) {
        res.status(400).send(error);
      } else {
        next();
      }
    });
  }

  static validateCreate(req: Request, res: Response, next: NextFunction) {
    ClientValidator.validateCreate(req.body, (error) => {
      if (error) {
        res.status(400).send(error);
      } else {
        next();
      }
    });
  }

  static validatePut(req: Request, res: Response, next: NextFunction) {
    ClientValidator.validatePut(req.params, req.body, (error) => {
      if (error) {
        res.status(400).send(error);
      } else {
        next();
      }
    });
  }
}
