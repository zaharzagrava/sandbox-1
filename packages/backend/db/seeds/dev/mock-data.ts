import * as Knex from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
  while (true) {
    try {
      const result = await knex.raw('select 1+1 as result');

      if (result) break;
    } catch (error) {}
  }

  // Deletes ALL existing entries
  await knex('client').del();

  // Inserts seed entries
  await knex('client').insert([
    {
      id: uuidv4(),
      full_name: 'John Smith I',
      username: 'johnsmith1',
      bio: 'The bio of John Smith.',
      email: 'johnsmith1@test.com',
      phone_number: '+3800748222367',
      gender: 'MALE',
      is_disabled: false,
      password: 'smith1pass',
      confirmed_at: new Date(),
      created_at: new Date()
    }
  ]);
}
