import { NextFunction, Request, Response } from 'express';
import SessionValidator from './validations';

export default class SessionMiddleware {
  constructor() {}

  static validateLogin(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    SessionValidator.validateLogin(request.body, (error) => {
      if (error) {
        response.status(400).send(error);
      } else {
        next();
      }
    });
  }

  static validateVerify(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    SessionValidator.validateVerify(request.cookies, (error) => {
      if (error) {
        response.status(400).send(error);
      } else {
        next();
      }
    });
  }
}
