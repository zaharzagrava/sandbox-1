import jwt from 'jsonwebtoken';
import { Client } from '../../db/models';
import {
  ClientDTO,
  ClientModel,
  AccessTokenData,
  SessionLogin,
  Callback,
} from '../../interfaces';
import bcrypt from 'bcrypt';

export default class SessionService {
  constructor() {}

  static async login(
    sessionLogin: SessionLogin,
    callback: Callback<{ client: ClientModel; accessToken: string }>
  ): Promise<void> {
    const client = (await Client.findOne<ClientModel>({
      where: {
        email: sessionLogin.email,
      },
    })) as ClientModel & ClientDTO;

    Client.prototype.authenticate(sessionLogin.password, client.password());

    if (!client) {
      callback({
        status: 400,
        message: `Client with provided email and password does not exist`,
      });
      return;
    }

    const accessTokenData: AccessTokenData = {
      id: client.id,
      email: client.email,
    };

    //create the access token with the shorter lifespan
    let accessToken = jwt.sign(
      accessTokenData,
      String(process.env.ACCESS_TOKEN_SECRET),
      {
        algorithm: 'HS256',
        expiresIn: Number(process.env.ACCESS_TOKEN_LIFE),
      }
    );

    callback(null, { client, accessToken });
  }

  static async verify(
    accessToken: string,
    callback: Callback<string | object>
  ) {
    let sessionData = jwt.verify(
      accessToken,
      String(process.env.ACCESS_TOKEN_SECRET)
    );

    callback(null, sessionData);
  }
}
