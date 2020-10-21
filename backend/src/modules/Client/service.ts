import {
  Callback,
  ClientDTO,
  ClientModel,
  CreateClientDTO,
} from 'src/interfaces';
import sequelize, { Client } from '../../db/models/';
import { Request, Response } from 'express';

export default class ClientService {
  constructor() {}

  static async getAll(callback: Callback<ClientModel[]>): Promise<void> {
    const instances = await Client.findAll<ClientModel>();
    callback(null, instances);
  }

  static async create(
    createClientDTD: CreateClientDTO,
    callback: Callback<ClientModel>
  ): Promise<void> {
    const newClient = await Client.create<ClientModel>({
      email: createClientDTD.email,
      password: createClientDTD.password,
      username: createClientDTD.username,
    });

    callback(null, newClient);
  }
}
