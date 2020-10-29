import {
  AccessTokenData,
  Callback,
  ClientGetDeleteUpdateParams,
  ClientModel,
  ClientUpdate,
  CreateClientDTO,
} from '../../interfaces/';
import { Client } from '../../db/models/';

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
    const newClient = await Client.create<ClientModel>({
      email: body.email,
      password: body.password,
      username: body.username,
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

    const [_, updatedClient] = await Client.update<ClientModel>(body, {
      where: {
        id: accessTokenData.id,
      },
      returning: true,
    });

    callback(null, updatedClient[0]);
  }
}
