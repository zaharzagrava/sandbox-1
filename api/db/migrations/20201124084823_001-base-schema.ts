/* eslint no-console: 0, no-await-in-loop: 0, no-empty: 0 */
import * as Knex from "knex";
import { DBTable } from "../../src/types";

export async function up(knex: Knex): Promise<void> {
  console.log("Waiting for database conneciton...");
  while (true)
    try {
      const result = await knex.raw("select 1+1 as result");

      if (result) break;
    } catch (error) {
      console.log("Error when checking db connection");
      console.log(error);
    }

  console.log("Executing migrations...");
  let knexSchema;
  if (!(await knex.schema.hasTable(DBTable.USER)))
    knexSchema = await knex.schema.createTable(DBTable.USER, function (table) {
      table.uuid("id").primary();
      table.string("email", 255).unique().notNullable();
      table.string("full_name", 255).notNullable();
      table.string("language", 5).notNullable();
      table.string("bio", 150).nullable();
      table.string("phone_number", 255).unique();
      table.string("gender", 1).notNullable();
      table.string("password", 255).notNullable();
      table.dateTime("born_at").notNullable();
      table.boolean("is_athlete").notNullable();
      table.boolean("is_organizer").notNullable();
      table.float("height").nullable();
      table.float("strength").nullable();
      table.dateTime("confirmed_at");
      table.dateTime("created_at").notNullable();
    });

  if (!(await knex.schema.hasTable(DBTable.EVENT)))
    knexSchema = await knex.schema.createTable(DBTable.EVENT, function (table) {
      table.uuid("id").primary();
      table.string("name", 255).notNullable();
      table.string("description", 512).notNullable();
      table.dateTime("scheduled_at").notNullable();
      table.dateTime("created_at").notNullable();
    });

  if (!(await knex.schema.hasTable(DBTable.DOCUMENT)))
    knexSchema = await knex.schema.createTable(
      DBTable.DOCUMENT,
      function (table) {
        table.uuid("id").primary();
        table.string("text", 2200).notNullable();
        table.dateTime("created_at").notNullable();
      }
    );

  if (!(await knex.schema.hasTable(DBTable.NOTIFICATION)))
    knexSchema = await knex.schema.createTable(
      DBTable.NOTIFICATION,
      function (table) {
        table.uuid("id").primary();
        table.string("text", 300).notNullable();
        table.dateTime("created_at").notNullable();
      }
    );

  if (!(await knex.schema.hasTable(DBTable.USER_EVENT)))
    knexSchema = await knex.schema.createTable(
      DBTable.USER_EVENT,
      function (table) {
        table.uuid("id").primary();
        table
          .uuid("user_id")
          .references("user.id")
          .notNullable()
          .onDelete("CASCADE");
        table
          .uuid("event_id")
          .references("event.id")
          .notNullable()
          .onDelete("CASCADE");
        table.boolean("is_organizer");
        table.boolean("is_participant");
        table.boolean("is_watcher");
        table.dateTime("created_at").notNullable();
      }
    );

  if (!(await knex.schema.hasTable(DBTable.USER_DOCUMENT)))
    knexSchema = await knex.schema.createTable(
      DBTable.USER_DOCUMENT,
      function (table) {
        table.uuid("id").primary();
        table
          .uuid("user_id")
          .references("user.id")
          .notNullable()
          .onDelete("CASCADE");
        table
          .uuid("document_id")
          .references("document.id")
          .notNullable()
          .onDelete("CASCADE");
        table.dateTime("created_at").notNullable();
      }
    );

  if (!(await knex.schema.hasTable(DBTable.NOTIFICATION_EVENT)))
    knexSchema = await knex.schema.createTable(
      DBTable.NOTIFICATION_EVENT,
      function (table) {
        table.uuid("id").primary();
        table
          .uuid("notification_id")
          .references("notification.id")
          .notNullable()
          .onDelete("CASCADE");
        table
          .uuid("event_id")
          .references("event.id")
          .notNullable()
          .onDelete("CASCADE");
      }
    );

  if (!(await knex.schema.hasTable(DBTable.NOTIFICATION_USER)))
    knexSchema = await knex.schema.createTable(
      DBTable.NOTIFICATION_USER,
      function (table) {
        table.uuid("id").primary();
        table
          .uuid("notification_id")
          .references("notification.id")
          .notNullable()
          .onDelete("CASCADE");
        table
          .uuid("user_id")
          .references("user.id")
          .notNullable()
          .onDelete("CASCADE");
      }
    );

  return knexSchema;
}

export async function down(knex: Knex): Promise<void> {
  console.log("Waiting for database conneciton...");
  while (true)
    try {
      const result = await knex.raw("select 1+1 as result");

      if (result) break;
    } catch (error) {}

  console.log("Executing demigrations...");

  knex.schema.dropTableIfExists(DBTable.NOTIFICATION_EVENT);
  knex.schema.dropTableIfExists(DBTable.NOTIFICATION_USER);
  knex.schema.dropTableIfExists(DBTable.USER_DOCUMENT);
  knex.schema.dropTableIfExists(DBTable.USER_EVENT);

  knex.schema.dropTableIfExists(DBTable.USER);
  knex.schema.dropTableIfExists(DBTable.EVENT);
  knex.schema.dropTableIfExists(DBTable.DOCUMENT);
  knex.schema.dropTableIfExists(DBTable.NOTIFICATION);
}
