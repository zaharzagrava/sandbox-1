import { Model } from 'sequelize';
import Client from 'src/db/models/Client';
import db from '../../db/models/index';
import { ClientDTO, CreateClientDTO } from '../../interfaces/';

export default class ClientService {
  constructor() {}

  static async getAll(callback: any) {
    const instances = await db.Client.findAll();
    return callback(null, instances);
  }
}
