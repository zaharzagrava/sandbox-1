
import { Response } from 'express';
import { GraphQLResolveInfo } from 'graphql';
import {
  Arg,
  Args,
  ArgsDictionary,
  ArgsType,
  Authorized,
  Ctx,
  Field,
  FieldResolver,
  ID,
  Info,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { InfoParamMetadata } from 'type-graphql/dist/metadata/definitions';
import knex from 'knex';
import { reqWrapper } from '../middleware';
import { Context, OrderDirection } from '../types';
import _, { String } from 'lodash';

/* client table model */
@ObjectType({ description: 'Client' })
class Client {
  @Field((type) => ID, { nullable: false })
  id: string = '';

  @Field((type) => String, { nullable: true })
  full_name?: string;

  @Field((type) => String, { nullable: false })
  username: string = '';

  @Field((type) => String, { nullable: true })
  website?: string;

  @Field((type) => String, { nullable: true })
  bio?: string;

  @Field((type) => String, { nullable: true })
  avatar?: string;

  @Field((type) => String, { nullable: false })
  email: string = '';

  @Field((type) => String, { nullable: true })
  phone_number?: string;

  @Field((type) => String, { nullable: true })
  gender?: string;

  @Field((type) => Boolean, { nullable: true })
  is_disabled?: boolean;

  @Field((type) => String, { nullable: false })
  password: string = '';

  @Field((type) => Date, { nullable: false })
  confirmed_at: Date = new Date;

  @Field((type) => Date, { nullable: false })
  created_at: Date = new Date;
}

@Resolver(Client)
export class ClientResolver {

  @UseMiddleware(reqWrapper)
  @Query(() => Client)
  async getClient(
    @Args() { id }: GetClientArgs,
    @Ctx() context: Context
  ) {
    let data: any = (
      await context
        .knexConnection('client')
        .join(
          'client_knowledge_file',
          'knowledge_file.id',
          'client_knowledge_file.knowledge_file_id'
        )
        .where('knowledge_file.id', id)
        .select(context.selectionSet.map((elem) => `knowledge_file.${elem}`))
    )[0];
    // TODO: add client_id check

    let response: any = {};
    // Rewriting underscored object data to camelCased object response
    context.selectionSet.map((field) => {
      response[_.camelCase(field)] = data[field];
    });

    console.log(response);

    return response;
  }

}

@ArgsType()
class GetClientArgs {
  @Field((type) => String, { nullable: false })
  id: string = '';
}

enum OrderableFields {
  FULL_NAME = 'FULL_NAME',
  USERNAME = 'USERNAME',
  GENDER = 'GENDER',
  CREATED_AT = 'CREATED_AT',
}

@InputType()
class ClientOrderSettings {
  @Field((type) => OrderDirection)
  orderDirection: OrderDirection = OrderDirection.DESC;

  @Field((type) => OrderableFields)
  orderField: OrderableFields = OrderableFields.FULL_NAME;
}

