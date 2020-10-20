import db from '../../db/models/index';

export default class ClientService {
  constructor() {}

  static async getAll(callback: any) {
    const instances = await db.Client;

    return callback(null, instances);
  }
}
