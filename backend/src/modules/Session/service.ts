import jwt from 'jsonwebtoken';
import { Client } from '../../db/models';
import {
  ClientDTO,
  ClientModel,
  AccessTokenData,
  SessionLogin,
  Callback,
  PostCommentModel,
} from '../../interfaces';
import bcrypt from 'bcrypt';
import { PostComment } from 'src/db/models/PostComment';

export default class SessionService {
  constructor() {}

  static async get(
    accessTokenData: AccessTokenData,
    callback: Callback<ClientModel>
  ): Promise<void> {
    const client = await Client.findOne<ClientModel>({
      where: {
        id: accessTokenData.id,
      },
    });

    if (!client) {
      callback({
        status: 400,
        message: `Client #${accessTokenData.id} does not exist`,
      });
      return;
    }

    callback(null, client);
  }

  static async login(
    sessionLogin: SessionLogin,
    callback: Callback<{ client: ClientModel; accessToken: string }>
  ): Promise<void> {
    const client = (await Client.findOne<ClientModel>({
      where: {
        email: sessionLogin.email,
      },
    })) as ClientModel & ClientDTO;

    if (!client) {
      callback({
        status: 400,
        message: `Client with provided email and password does not exist`,
      });
      return;
    }

    if (!bcrypt.compareSync(sessionLogin.password, client.password())) {
      callback({
        status: 400,
        message: `Wrong password`,
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
    let accessTokenData: AccessTokenData = jwt.verify(
      accessToken,
      String(process.env.ACCESS_TOKEN_SECRET)
    ) as AccessTokenData;

    callback(null, accessTokenData);
  }
}
