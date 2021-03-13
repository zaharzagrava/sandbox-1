import { MiddlewareFn } from 'type-graphql';
import _ from 'lodash';
import { Context } from './types';

export const errorWrapper: MiddlewareFn<Context> = async (args, next) => {
  try {
    return await next();
  } catch (error) {
    console.log('=== error ===\n\n\n');
    console.log(error);
    console.log('\n\n\n=== error ===');

    return error;
  }
};
