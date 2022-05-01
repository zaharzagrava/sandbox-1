/* eslint no-console: 0, no-await-in-loop: 0, @typescript-eslint/no-unused-vars: 0, @typescript-eslint/naming-convention: 0, no-constant-condition: 0 */
import * as Knex from "knex";
import { v4 as uuidv4 } from "uuid";
import faker from "faker";

import { hash } from "bcrypt";
import { DateTime } from "luxon";
import constants from "../../../src/constants";
import { DBTable } from "../../../src/types";

export async function seed(knex: Knex): Promise<void> {
  faker.seed(123);

  while (true) {
    try {
      const result = await knex.raw("select 1+1 as result");

      if (result) break;
    } catch (error) {
      console.log("testing knex connection has failed");
    }
  }

  // Deletes all existing entries
  await knex(DBTable.USER).del();
  await knex(DBTable.EVENT).del();
  await knex(DBTable.DOCUMENT).del();
  await knex(DBTable.NOTIFICATION).del();

  await knex(DBTable.NOTIFICATION_EVENT).del();
  await knex(DBTable.NOTIFICATION_USER).del();
  await knex(DBTable.USER_DOCUMENT).del();
  await knex(DBTable.USER_EVENT).del();

  // Inserts seed entries
  const users = await knex(DBTable.USER).insert(
    [
      {
        id: faker.datatype.uuid(),
        email: "johnsmith@test.com",
        full_name: "John Smith",
        language: "en",
        bio: "The bio of John Smith",
        phone_number: "+3800943232371",
        gender: "M",
        password: await hash("smith1pass", constants.BCRYPT_SALT_ROUNDS),
        born_at: new Date(),
        confirmed_at: new Date(),
        created_at: new Date(),
        is_athlete: false,
        is_organizer: true,
      },
      {
        id: faker.datatype.uuid(),
        email: "johngiligan@test.com",
        full_name: "John Giligan",
        language: "en",
        bio: "The bio of John Giligan",
        phone_number: "+3800973232371",
        gender: "M",
        password: await hash("smith1pass", constants.BCRYPT_SALT_ROUNDS),
        born_at: new Date(),
        confirmed_at: new Date(),
        created_at: new Date(),
        is_athlete: false,
        is_organizer: true,
      },
      {
        id: faker.datatype.uuid(),
        email: "arianaportman@test.com",
        full_name: "Ariana Portman",
        language: "en",
        bio: "The bio of Ariana Portman",
        phone_number: "+380094321461",
        gender: "M",
        password: await hash("smith1pass", constants.BCRYPT_SALT_ROUNDS),
        born_at: new Date(),
        confirmed_at: new Date(),
        created_at: new Date(),
        is_athlete: false,
        is_organizer: true,
      },
      {
        id: faker.datatype.uuid(),
        email: "emilyblunsh@test.com",
        full_name: "Emily Blunsh",
        language: "en",
        bio: "The bio of Emily Blunsh",
        phone_number: "+3800948232376",
        gender: "M",
        password: await hash("smith1pass", constants.BCRYPT_SALT_ROUNDS),
        born_at: new Date(),
        confirmed_at: new Date(),
        created_at: new Date(),
        is_athlete: false,
        is_organizer: true,
      },
    ],
    "*"
  );

  // Inserts seed entries
  const events = await knex(DBTable.EVENT).insert(
    [
      {
        id: faker.datatype.uuid(),
        name: "Test Event #1",
        description: "Description of test event #1",
        scheduled_at: DateTime.utc(2021, 12, 19),
        created_at: new Date(),
      },
      {
        id: faker.datatype.uuid(),
        name: "Test Event #2",
        description: "Description of test event #2",
        scheduled_at: DateTime.utc(2021, 12, 18),
        created_at: new Date(),
      },
      {
        id: faker.datatype.uuid(),
        name: "Test Event #3",
        description: "Description of test event #3",
        scheduled_at: DateTime.utc(2021, 12, 18),
        created_at: new Date(),
      },
      {
        id: faker.datatype.uuid(),
        name: "Test Event #4",
        description: "Description of test event #4",
        scheduled_at: DateTime.utc(2021, 12, 17),
        created_at: new Date(),
      },
      {
        id: faker.datatype.uuid(),
        name: "Test Event #5",
        description: "Description of test event #5",
        scheduled_at: DateTime.utc(2021, 12, 16),
        created_at: new Date(),
      },
      {
        id: faker.datatype.uuid(),
        name: "Test Event #6",
        description: "Description of test event #6",
        scheduled_at: DateTime.utc(2021, 12, 19),
        created_at: new Date(),
      },
    ],
    "*"
  );

  // Inserts seed entries
  const documents = await knex(DBTable.DOCUMENT).insert(
    [
      {
        id: faker.datatype.uuid(),
        text: "This is document #0",
        created_at: new Date(),
      },
      {
        id: faker.datatype.uuid(),
        text: "This is document #1",
        created_at: new Date(),
      },
      {
        id: faker.datatype.uuid(),
        text: "This is document #2",
        created_at: new Date(),
      },
      {
        id: faker.datatype.uuid(),
        text: "This is document #3",
        created_at: new Date(),
      },
      {
        id: faker.datatype.uuid(),
        text: "This is document #4",
        created_at: new Date(),
      },
      {
        id: faker.datatype.uuid(),
        text: "This is document #5",
        created_at: new Date(),
      },
    ],
    "*"
  );

  // Inserts seed entries
  const notifications = await knex(DBTable.NOTIFICATION).insert(
    [
      {
        id: faker.datatype.uuid(),
        text: "This is notification #0",
        created_at: new Date(),
      },
      {
        id: faker.datatype.uuid(),
        text: "This is notification #1",
        created_at: new Date(),
      },
      {
        id: faker.datatype.uuid(),
        text: "This is notification #2",
        created_at: new Date(),
      },
    ],
    "*"
  );

  // Inserts seed entries
  const users_events = await knex(DBTable.USER_EVENT).insert([
    {
      id: faker.datatype.uuid(),
      user_id: users[0].id,
      event_id: events[0].id,
      is_organizer: true,
      is_participant: true,
      is_watcher: true,
      created_at: new Date(),
    },
    {
      id: faker.datatype.uuid(),
      user_id: users[1].id,
      event_id: events[1].id,
      is_organizer: true,
      is_participant: false,
      is_watcher: false,
      created_at: new Date(),
    },
    {
      id: faker.datatype.uuid(),
      user_id: users[0].id,
      event_id: events[1].id,
      is_organizer: false,
      is_participant: true,
      is_watcher: true,
      created_at: new Date(),
    },
    {
      id: faker.datatype.uuid(),
      user_id: users[1].id,
      event_id: events[1].id,
      is_organizer: false,
      is_participant: false,
      is_watcher: true,
      created_at: new Date(),
    },
    {
      id: faker.datatype.uuid(),
      user_id: users[2].id,
      event_id: events[1].id,
      is_organizer: false,
      is_participant: false,
      is_watcher: true,
      created_at: new Date(),
    },
    {
      id: faker.datatype.uuid(),
      user_id: users[0].id,
      event_id: events[2].id,
      is_organizer: true,
      is_participant: true,
      is_watcher: false,
      created_at: new Date(),
    },
    {
      id: faker.datatype.uuid(),
      user_id: users[0].id,
      event_id: events[3].id,
      is_organizer: false,
      is_participant: true,
      is_watcher: true,
      created_at: new Date(),
    },
    {
      id: faker.datatype.uuid(),
      user_id: users[3].id,
      event_id: events[3].id,
      is_organizer: true,
      is_participant: false,
      is_watcher: false,
      created_at: new Date(),
    },
  ]);

  // Inserts seed entries
  const users_documents = await knex(DBTable.USER_DOCUMENT).insert([
    {
      id: faker.datatype.uuid(),
      user_id: users[0].id,
      document_id: documents[0].id,
      created_at: new Date(),
    },
    {
      id: faker.datatype.uuid(),
      user_id: users[1].id,
      document_id: documents[1].id,
      created_at: new Date(),
    },
    {
      id: faker.datatype.uuid(),
      user_id: users[2].id,
      document_id: documents[2].id,
      created_at: new Date(),
    },
    {
      id: faker.datatype.uuid(),
      user_id: users[3].id,
      document_id: documents[3].id,
      created_at: new Date(),
    },
  ]);

  // Inserts seed entries
  const notifications_events = await knex(DBTable.NOTIFICATION_EVENT).insert([
    {
      id: faker.datatype.uuid(),
      notification_id: notifications[0].id,
      event_id: events[0].id,
    },
    {
      id: faker.datatype.uuid(),
      notification_id: notifications[1].id,
      event_id: events[0].id,
    },
    {
      id: faker.datatype.uuid(),
      notification_id: notifications[2].id,
      event_id: events[0].id,
    },
  ]);
}