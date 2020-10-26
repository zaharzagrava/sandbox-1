import { NextFunction, Request, Response } from 'express';
import SessionService from './service';

export default class SessionController {
  constructor() {}

  static async get(request: Request, response: Response, next: NextFunction) {
    try {
      await SessionService.get(
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
      next(error);
    }
  }

  static async login(request: Request, response: Response, next: NextFunction) {
    try {
      await SessionService.login(request.body, (error, data) => {
        if (error) {
          response.status(error.status).send(error);
          return;
        }

        response.cookie(`accessToken`, data?.accessToken, {
          maxAge: Number(process.env.ACCESS_TOKEN_LIFE),
          httpOnly: true,
          domain: process.env.FRONTEND_DOMAIN,
        });
        response.status(200).json(data?.client);
      });
    } catch (error) {
      next(error);
    }
  }

  static async logout(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      response.clearCookie('accessToken', {
        domain: process.env.FRONTEND_DOMAIN,
      });

      response.status(200).send(true);
    } catch (error) {
      next(error);
    }
  }

  static async verify(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      await SessionService.verify(
        request.cookies.accessToken,
        (error, data) => {
          if (error) {
            response.status(error.status).send(error);
            return;
          }

          response.locals.accessTokenData = data;
          next();
        }
      );
    } catch (error) {
      next(error);
    }
  }
}
