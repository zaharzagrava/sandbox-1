import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  console.log('Waiting for database conneciton...');
  while (true) {
    try {
      const result = await knex.raw('select 1+1 as result');

      if (result) break;
    } catch (error) {}
  }

  console.log('Executing migrations...');
  let knexSchema;
  if (!(await knex.schema.hasTable('client'))) {
    knexSchema = await knex.schema.createTable('client', function (table) {
      table.uuid('id').primary();
      table.string('full_name', 255);
      table.string('username', 30).unique().notNullable();
      table.string('website', 255);
      table.string('bio', 150);
      table.string('avatar', 255);
      table.string('email', 255).unique().notNullable();
      table.string('phone_number', 255).unique();
      table.string('gender', 255);
      table.boolean('is_disabled');
      table.string('password', 255).notNullable();
      table.dateTime('confirmed_at').notNullable();
      table.dateTime('created_at').notNullable();
    });
  }

  if (!(await knex.schema.hasTable('comment'))) {
    knexSchema = await knex.schema.createTable('comment', function (table) {
      table.uuid('id').primary();
      table.string('text', 300).notNullable();
      table.dateTime('created_at').notNullable();
    });
  }

  if (!(await knex.schema.hasTable('post'))) {
    knexSchema = await knex.schema.createTable('post', function (table) {
      table.uuid('id').primary();
      table.string('text', 2200).notNullable();
      table.specificType('multimedia', 'varchar(255)[]').notNullable();
      table.dateTime('created_at').notNullable();
    });
  }

  if (!(await knex.schema.hasTable('hashtag'))) {
    knexSchema = await knex.schema.createTable('hashtag', function (table) {
      table.uuid('id').primary();
      table.string('text', 255).notNullable();
    });
  }

  if (!(await knex.schema.hasTable('client_comment'))) {
    knexSchema = await knex.schema.createTable('client_comment', function (table) {
      table.uuid('id').primary();
      table.uuid('client_id').references('client.id').notNullable().onDelete('CASCADE');
      table.uuid('comment_id').references('comment.id').notNullable().onDelete('CASCADE');
      table.boolean('is_liked');
      table.boolean('is_author');
    });
  }

  if (!(await knex.schema.hasTable('client_post'))) {
    knexSchema = await knex.schema.createTable('client_post', function (table) {
      table.uuid('id').primary();
      table.uuid('client_id').references('client.id').notNullable().onDelete('CASCADE');
      table.uuid('post_id').references('post.id').notNullable().onDelete('CASCADE');
      table.boolean('is_liked');
      table.boolean('is_author');
      table.dateTime('created_at').notNullable();
    });
  }

  if (!(await knex.schema.hasTable('post_comment'))) {
    knexSchema = await knex.schema.createTable('post_comment', function (table) {
      table.uuid('id').primary();
      table.uuid('post_id').references('post.id').notNullable().onDelete('CASCADE');
      table.uuid('comment_id').references('comment.id').notNullable().onDelete('CASCADE');
    });
  }

  if (!(await knex.schema.hasTable('hashtag_client'))) {
    knexSchema = await knex.schema.createTable('hashtag_client', function (table) {
      table.uuid('id').primary();
      table.uuid('client_id').references('client.id').notNullable().onDelete('CASCADE');
      table.uuid('hashtag_id').references('hashtag.id').notNullable().onDelete('CASCADE');
      table.boolean('is_following');
      table.boolean('has_in_bio');
    });
  }

  if (!(await knex.schema.hasTable('hashtag_comment'))) {
    knexSchema = await knex.schema.createTable('hashtag_comment', function (table) {
      table.uuid('id').primary();
      table.uuid('comment_id').references('comment.id').notNullable().onDelete('CASCADE');
      table.uuid('hashtag_id').references('hashtag.id').notNullable().onDelete('CASCADE');
    });
  }

  if (!(await knex.schema.hasTable('hashtag_post'))) {
    knexSchema = await knex.schema.createTable('hashtag_post', function (table) {
      table.uuid('id').primary();
      table.uuid('post_id').references('post.id').notNullable().onDelete('CASCADE');
      table.uuid('hashtag_id').references('hashtag.id').notNullable().onDelete('CASCADE');
    });
  }

  return knexSchema;
}

export async function down(knex: Knex): Promise<void> {
  console.log('Waiting for database conneciton...');
  while (true) {
    try {
      const result = await knex.raw('select 1+1 as result');

      if (result) break;
    } catch (error) {}
  }

  console.log('Executing demigrations...');

  knex.schema.dropTableIfExists('client_comment');
  knex.schema.dropTableIfExists('client_post');
  knex.schema.dropTableIfExists('post_comment');
  knex.schema.dropTableIfExists('hashtag_client');
  knex.schema.dropTableIfExists('hashtag_comment');
  knex.schema.dropTableIfExists('hashtag_post');

  knex.schema.dropTableIfExists('client');
  knex.schema.dropTableIfExists('comment');
  knex.schema.dropTableIfExists('post');
  knex.schema.dropTableIfExists('hashtag');
}
