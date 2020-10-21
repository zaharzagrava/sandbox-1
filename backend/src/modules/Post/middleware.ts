import { NextFunction, Request, Response } from 'express';
import PostValidator from './validations';

export default class PostMiddleware {
  constructor() {}

  static validateGetDelete(req: Request, res: Response, next: NextFunction) {
    PostValidator.validateGetDelete(req.params, (error) => {
      if (error) {
        res.status(400).send(error);
      } else {
        next();
      }
    });
  }

  static validateCreate(req: Request, res: Response, next: NextFunction) {
    PostValidator.validateCreate(req.body, (error) => {
      if (error) {
        res.status(400).send(error);
      } else {
        next();
      }
    });
  }

  static validateUpdate(req: Request, res: Response, next: NextFunction) {
    PostValidator.validateUpdate(req.params, req.body, (error) => {
      if (error) {
        res.status(400).send(error);
      } else {
        next();
      }
    });
  }
}
