import Client from 'src/db/models/Client';
import { Callback, ClientDTO, CreateClientDTO } from 'src/interfaces';
import db from '../../db/models/index';
import { Request, Response } from 'express';

export default class ClientService {
  constructor() {}

  static async getAll(callback: Callback<Client[]>): Promise<void> {
    const instances = await db.Client.findAll();
    callback(null, instances);
  }

  static async create(
    createClientDTD: CreateClientDTO,
    callback: Callback<Client>
  ): Promise<void> {
    console.log('@123');
    console.log(createClientDTD);

    const newClient = await db.Client.create({
      email: createClientDTD.email,
      password: createClientDTD.password,
      username: createClientDTD.username,
      /* --- */
      full_name: createClientDTD.username,
      website: ' ',
      bio: ' ',
      avatar: ' ',
      phone_number: ' ',
      gender: ' ',
    });

    console.log('@newClient');
    console.log(newClient);

    callback(null, newClient);
  }
}
