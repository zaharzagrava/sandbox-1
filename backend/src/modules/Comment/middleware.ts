import { NextFunction, Request, Response } from 'express';
import CommentValidator from './validations';

export default class CommentMiddleware {
  constructor() {}

  static validateGetDelete(req: Request, res: Response, next: NextFunction) {
    CommentValidator.validateGetDelete(req.params, (error) => {
      if (error) {
        res.status(400).send(error);
      } else {
        next();
      }
    });
  }

  static validateCreate(req: Request, res: Response, next: NextFunction) {
    CommentValidator.validateCreate(req.body, (error) => {
      if (error) {
        res.status(400).send(error);
      } else {
        next();
      }
    });
  }

  static validateUpdate(req: Request, res: Response, next: NextFunction) {
    CommentValidator.validateUpdate(req.params, req.body, (error) => {
      if (error) {
        res.status(400).send(error);
      } else {
        next();
      }
    });
  }
}
