import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Client } from '../../db/models';
import {
  ClientDTO,
  ClientModel,
  SessionData,
  SessionLogin,
} from '../../interfaces';

export default class SessionController {
  constructor() {}

  static async login(request: Request, response: Response, next: NextFunction) {
    try {
      const sessionData: SessionLogin = request.body;

      /* Search whether password corresponds with username */
      const client = (await Client.findOne<ClientModel>({
        where: {
          email: sessionData.email,
          password: sessionData.password,
        },
      })) as ClientModel & ClientDTO;

      if (!client) {
        response.status(400).send({
          message: `Client with provided email and password does not exist`,
        });
        return;
      }

      const userSession: SessionData = { id: client.id, email: client.email };

      //create the access token with the shorter lifespan
      let accessToken = jwt.sign(
        userSession,
        String(process.env.ACCESS_TOKEN_SECRET),
        {
          algorithm: 'HS256',
          expiresIn: Number(process.env.ACCESS_TOKEN_LIFE),
        }
      );

      response.cookie(`accessToken`, accessToken, {
        maxAge: Number(process.env.ACCESS_TOKEN_LIFE),
        httpOnly: true,
        domain: process.env.FRONTEND_DOMAIN,
      });
      response.status(200).json(client);
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
    console.log('---');

    try {
      const { accessToken } = request.cookies;

      let payload = jwt.verify(
        accessToken,
        String(process.env.ACCESS_TOKEN_SECRET)
      );

      response.locals.sessionData = payload;
      next();
    } catch (error) {
      next(error);
    }
  }
}
