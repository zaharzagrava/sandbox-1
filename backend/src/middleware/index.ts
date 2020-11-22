import { MiddlewareFn } from 'type-graphql';
import { Context } from '../types';
import knex from 'knex';
import { FieldNode } from 'graphql';
import _ from "lodash";

export const reqWrapper: MiddlewareFn<Context> = async (
  { root, args, context, info },
  next
) => {
  try {
    /* Input validation */
    if (info.fieldNodes.length !== 1)
      throw new Error('info.fieldNodes.length !== 1');
    if (
      info.fieldNodes[0].selectionSet === undefined ||
      info.fieldNodes[0].selectionSet === null
    )
      throw new Error('info.fieldNodes[0].selectionSet === undefined / null');

    const fieldNode = info.fieldNodes[0];
    const selections = info.fieldNodes[0].selectionSet.selections;
    for (let i = 0; i < selections.length; i++) {
      const selection = selections[i] as FieldNode;

      if (selection.name === undefined || selection.name === null)
        throw new Error('selection.name === undefined / null');

      if (selection.name.value === undefined || selection.name === null)
        throw new Error(
          `selection.name.value of ${i} fieldNode === undefined / null`
        );
    }

    /* Connecting to knex */
    context.knexConnection = knex({
      client: 'pg',
      connection: {
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
      },
    });

    /* Authorization */

    /* Creating selectionSet */
    context.selectionSet = [];
    for (let i = 0; i < selections.length; i++) {
      const selection = selections[i] as FieldNode;
      context.selectionSet.push(_.snakeCase(selection.name.value));
    }

    /* Running the resolver */
    const response = await next();

    /* Disconnecting from knex */
    context.knexConnection
      .destroy()
      .then(() => {
        console.log('@successfuly disconnected');
      })
      .catch(() => {
        console.error('@unsuccessfuly disconnected');
      });

    return response;
  } catch (error) {
    console.log('=== error ===\n\n\n');
    console.log(error);
    console.log('\n\n\n=== error ===');

    return error;
  }
};