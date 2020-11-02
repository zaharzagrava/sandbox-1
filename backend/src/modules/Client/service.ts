import {
  AccessTokenData,
  Callback,
  ClientDTO,
  ClientGetDeleteUpdateParams,
  ClientModel,
  ClientUpdate,
  ClientUpdatePassword,
  CreateClientDTO,
  UpdateClientResponse,
} from '../../interfaces/';
import { Op } from 'sequelize';
import { Client } from '../../db/models/';
import { compareSync, hashSync } from '../../utils/';

export default class ClientService {
  constructor() {}

  static async get(
    params: ClientGetDeleteUpdateParams,
    callback: Callback<ClientModel>
  ): Promise<void> {
    const client = await Client.findOne<ClientModel>({
      where: {
        id: params.id,
      },
    });

    if (!client) {
      callback({
        status: 400,
        message: `Client #${params.id} does not exist`,
      });
      return;
    }

    callback(null, client);
  }

  static async getAll(callback: Callback<ClientModel[]>): Promise<void> {
    const clients = await Client.findAll<ClientModel>();
    callback(null, clients);
  }

  static async create(
    body: CreateClientDTO,
    callback: Callback<ClientModel>
  ): Promise<void> {
    const client = (await Client.findOne<ClientModel>({
      where: {
        [Op.or]: [
          {
            username: body.username,
          },
          {
            email: body.email,
          },
        ],
      },
    })) as ClientModel & ClientDTO;

    if (client) {
      callback({
        status: 400,
        message: `Client with provided email (${client.email}) or username (${client.username}) already exists`,
      });
      return;
    }

    const newClient = await Client.create<ClientModel>({
      email: body.email,
      password: hashSync(body.password, Number(process.env.BCRYPT_SALT_ROUNDS)),
      username: body.username,
      full_name: body.full_name,
    });

    callback(null, newClient);
  }

  static async delete(
    accessTokenData: AccessTokenData,
    callback: Callback<null>
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

    await Client.destroy<any>({
      where: {
        id: accessTokenData.id,
      },
    });

    callback(null, null);
  }

  static async update(
    accessTokenData: AccessTokenData,
    body: ClientUpdate,
    callback: Callback<UpdateClientResponse>
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

    const [_, updatedClient] = (await Client.update<ClientModel>(body, {
      where: {
        id: accessTokenData.id,
      },
      returning: true,
    })) as [number, (ClientModel & ClientDTO)[]];

    callback(null, updatedClient[0]);
  }

  static async updatePassword(
    accessTokenData: AccessTokenData,
    body: ClientUpdatePassword,
    callback: Callback<UpdateClientResponse>
  ): Promise<void> {
    const client = (await Client.findOne<ClientModel>({
      where: {
        id: accessTokenData.id,
      },
    })) as ClientModel & ClientDTO;

    if (!client) {
      callback({
        status: 400,
        message: `Client #${accessTokenData.id} does not exist`,
      });
      return;
    }

    if (!compareSync(body.old_password, client.password())) {
      callback({
        status: 400,
        message: 'Wrong old password',
      });
      return;
    }

    const [_, updatedClient] = (await Client.update<ClientModel>(
      {
        // @ts-ignore
        password: hashSync(
          body.new_password,
          Number(process.env.BCRYPT_SALT_ROUNDS)
        ),
      },
      {
        where: {
          id: accessTokenData.id,
        },
        returning: true,
      }
    )) as [number, (ClientModel & ClientDTO)[]];

    callback(null, updatedClient[0]);
  }
}
