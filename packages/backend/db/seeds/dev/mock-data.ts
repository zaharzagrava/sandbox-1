import * as Knex from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
  while (true) {
    try {
      const result = await knex.raw('select 1+1 as result');

      if (result) break;
    } catch (error) {}
  }

  // Deletes all existing entries
  await knex('client').del();
  await knex('comment').del();
  await knex('post').del();
  await knex('hashtag').del();

  await knex('client_comment').del();
  await knex('client_post').del();
  await knex('hashtag_client').del();
  await knex('hashtag_comment').del();
  await knex('hashtag_post').del();

  // Inserts seed entries
  const clients = await knex('client').insert(
    [
      {
        id: uuidv4(),
        full_name: 'John Smith',
        username: 'johnsmith',
        website: 'https://test.johnsmith.com',
        bio: 'The bio of John Smith',
        avatar: 'https://picsum.photos/300/300',
        email: 'johnsmith@test.com',
        phone_number: '+3800943232371',
        gender: 'MALE',
        is_disabled: false,
        password: 'smith1pass',
        confirmed_at: new Date(),
        created_at: new Date()
      },
      {
        id: uuidv4(),
        full_name: 'Josh Giligan',
        username: 'joshgiligan',
        website: 'https://test.joshgiligan.com',
        bio: 'The bio of Josh Giligan.',
        avatar: 'https://picsum.photos/300/300',
        email: 'joshgiligan@test.com',
        phone_number: '+3800783122217',
        gender: 'MALE',
        is_disabled: false,
        password: 'josh1pass',
        confirmed_at: new Date(),
        created_at: new Date()
      },
      {
        id: uuidv4(),
        full_name: 'Emily Blush',
        username: 'emilyblush',
        website: 'https://test.emilyblush.com',
        bio: 'The bio of Emily Blush.',
        avatar: 'https://picsum.photos/300/300',
        email: 'johnsmith1@test.com',
        phone_number: '+3800749365387',
        gender: 'FEMALE',
        is_disabled: false,
        password: 'emily1pass',
        confirmed_at: new Date(),
        created_at: new Date()
      },
      {
        id: uuidv4(),
        full_name: 'Peter Jackson',
        username: 'peterjackson',
        website: 'https://test.peterjackson.com',
        bio: 'The bio of John Peter Jackson.',
        avatar: 'https://picsum.photos/300/300',
        email: 'peterjackson@test.com',
        phone_number: '+3800748294613',
        gender: 'MALE',
        is_disabled: false,
        password: 'peter1pass',
        confirmed_at: new Date(),
        created_at: new Date()
      }
    ],
    '*'
  );

  // Inserts seed entries
  const comments = await knex('comment').insert(
    [
      {
        id: uuidv4(),
        text: `This is comment for some post`,
        created_at: new Date()
      },
      {
        id: uuidv4(),
        text: `This is comment with emojis 🥳 😏 😒 😞`,
        created_at: new Date()
      },
      {
        id: uuidv4(),
        text: `This is a short comment`,
        created_at: new Date()
      },
      {
        id: uuidv4(),
        text: `This is comment for some post`,
        created_at: new Date()
      },
      {
        id: uuidv4(),
        text: `This is comment for some post. This one is longer that the others`,
        created_at: new Date()
      },
      {
        id: uuidv4(),
        text: `This is comment for some post`,
        created_at: new Date()
      }
    ],
    '*'
  );

  // Inserts seed entries
  const posts = await knex('post').insert(
    [
      {
        id: uuidv4(),
        text: `👽 👾 🤖 🤗 🤔 🤭 ✊ 👊 🤛 #art`,
        multimedia: ['https://picsum.photos/400/600', 'https://picsum.photos/400/600'],
        created_at: new Date()
      },
      {
        id: uuidv4(),
        text: `This is post with emojis 🥳 😏 😒 😞`,
        multimedia: ['https://picsum.photos/400/600', 'https://picsum.photos/400/600'],
        created_at: new Date()
      },
      {
        id: uuidv4(),
        text: `This is a short post`,
        multimedia: ['https://picsum.photos/400/600', 'https://picsum.photos/400/600'],
        created_at: new Date()
      },
      {
        id: uuidv4(),
        text: `🙂 This is a post with empjis 🙂 @emilyblush`,
        multimedia: ['https://picsum.photos/400/600', 'https://picsum.photos/400/600'],
        created_at: new Date()
      },
      {
        id: uuidv4(),
        text: `This is post with very long text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. `,
        multimedia: ['https://picsum.photos/400/600', 'https://picsum.photos/400/600', 'https://picsum.photos/400/600'],
        created_at: new Date()
      },
      {
        id: uuidv4(),
        text: `This is comment for some post`,
        multimedia: ['https://picsum.photos/400/600'],
        created_at: new Date()
      }
    ],
    '*'
  );

  // Inserts seed entries
  const hashtags = await knex('hashtag').insert(
    [
      {
        id: uuidv4(),
        text: `#love`
      },
      {
        id: uuidv4(),
        text: `#beautiful`
      },
      {
        id: uuidv4(),
        text: `#fashion`
      },
      {
        id: uuidv4(),
        text: `#photooftheday`
      },
      {
        id: uuidv4(),
        text: '#art'
      },
      {
        id: uuidv4(),
        text: `#happy`
      }
    ],
    '*'
  );

  // Inserts seed entries
  const clients_comments = await knex('client_comment').insert([
    {
      id: uuidv4(),
      client_id: clients[0].id,
      comment_id: comments[0].id,
      is_liked: false,
      is_author: true
    },
    {
      id: uuidv4(),
      client_id: clients[1].id,
      comment_id: comments[1].id,
      is_liked: false,
      is_author: true
    },
    {
      id: uuidv4(),
      client_id: clients[2].id,
      comment_id: comments[2].id,
      is_liked: false,
      is_author: true
    },
    {
      id: uuidv4(),
      client_id: clients[3].id,
      comment_id: comments[3].id,
      is_liked: false,
      is_author: true
    },
    {
      id: uuidv4(),
      client_id: clients[0].id,
      comment_id: comments[4].id,
      is_liked: false,
      is_author: true
    },
    {
      id: uuidv4(),
      client_id: clients[1].id,
      comment_id: comments[5].id,
      is_liked: false,
      is_author: true
    },
    {
      id: uuidv4(),
      client_id: clients[0].id,
      comment_id: comments[4].id,
      is_liked: true,
      is_author: false
    },
    {
      id: uuidv4(),
      client_id: clients[1].id,
      comment_id: comments[5].id,
      is_liked: true,
      is_author: false
    }
  ]);

  // Inserts seed entries
  const clients_posts = await knex('client_post').insert([
    {
      id: uuidv4(),
      client_id: clients[0].id,
      post_id: posts[0].id,
      is_liked: false,
      is_author: true,
      created_at: new Date()
    },
    {
      id: uuidv4(),
      client_id: clients[1].id,
      post_id: posts[1].id,
      is_liked: false,
      is_author: true,
      created_at: new Date()
    },
    {
      id: uuidv4(),
      client_id: clients[2].id,
      post_id: posts[2].id,
      is_liked: false,
      is_author: true,
      created_at: new Date()
    },
    {
      id: uuidv4(),
      client_id: clients[3].id,
      post_id: posts[3].id,
      is_liked: false,
      is_author: true,
      created_at: new Date()
    },
    {
      id: uuidv4(),
      client_id: clients[0].id,
      post_id: posts[4].id,
      is_liked: false,
      is_author: true,
      created_at: new Date()
    },
    {
      id: uuidv4(),
      client_id: clients[1].id,
      post_id: posts[5].id,
      is_liked: false,
      is_author: true,
      created_at: new Date()
    },
    {
      id: uuidv4(),
      client_id: clients[0].id,
      post_id: posts[4].id,
      is_liked: true,
      is_author: false,
      created_at: new Date()
    },
    {
      id: uuidv4(),
      client_id: clients[1].id,
      post_id: posts[5].id,
      is_liked: true,
      is_author: false,
      created_at: new Date()
    }
  ]);

  // Inserts seed entries
  const posts_comments = await knex('post_comment').insert([
    {
      id: uuidv4(),
      comment_id: comments[0].id,
      post_id: posts[0].id
    },
    {
      id: uuidv4(),
      comment_id: comments[1].id,
      post_id: posts[1].id
    },
    {
      id: uuidv4(),
      comment_id: comments[2].id,
      post_id: posts[2].id
    },
    {
      id: uuidv4(),
      comment_id: comments[3].id,
      post_id: posts[3].id
    },
    {
      id: uuidv4(),
      comment_id: comments[4].id,
      post_id: posts[4].id
    },
    {
      id: uuidv4(),
      comment_id: comments[5].id,
      post_id: posts[5].id
    }
  ]);
}
