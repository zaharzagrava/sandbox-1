import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  while (true) {
    try {
      const result = await knex.raw('select 1+1 as result');

      if (result) break;
    } catch (error) {}
  }

  let knexSchema;
  if (!(await knex.schema.hasTable('client'))) {
    knexSchema = knex.schema.createTable('client', function (table) {
      table.uuid('id');
      table.string('full_name', 255);
      table.string('username', 30).notNullable();
      table.string('website', 255);
      table.string('bio', 150);
      table.string('avatar', 255);
      table.string('email', 255).notNullable();
      table.string('phone_number', 255);
      table.string('gender', 255);
      table.boolean('is_disabled');
      table.string('password', 255).notNullable();
      table.dateTime('confirmed_at').notNullable();
      table.dateTime('created_at').notNullable();
    });
  }

  return knexSchema;
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTableIfExists('client');
}
