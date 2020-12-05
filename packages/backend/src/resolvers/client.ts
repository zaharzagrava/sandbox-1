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
  UseMiddleware
} from 'type-graphql';
import { InfoParamMetadata } from 'type-graphql/dist/metadata/definitions';
import knex from 'knex';
import { reqWrapper } from '../middleware';
import { Context, OrderDirection } from '../types';
import _ from 'lodash';

/* client table model */
@ObjectType({ description: 'Client' })
class Client {
  @Field(type => ID, { nullable: false })
  id!: string;

  @Field(type => String, { nullable: true })
  full_name?: string;

  @Field(type => String, { nullable: false })
  username!: string;

  @Field(type => String, { nullable: true })
  website?: string;

  @Field(type => String, { nullable: true })
  bio?: string;

  @Field(type => String, { nullable: true })
  avatar?: string;

  @Field(type => String, { nullable: false })
  email!: string;

  @Field(type => String, { nullable: true })
  phone_number?: string;

  @Field(type => String, { nullable: true })
  gender?: string;

  @Field(type => Boolean, { nullable: true })
  is_disabled?: boolean;

  @Field(type => String, { nullable: false })
  password: string = '';

  @Field(type => Date, { nullable: false })
  confirmed_at!: Date;

  @Field(type => Date, { nullable: false })
  created_at!: Date;
}

@ArgsType()
class GetClientArgs {
  @Field(type => String, { nullable: false })
  id!: string;
}

enum OrderableFields {
  FULL_NAME = 'FULL_NAME',
  USERNAME = 'USERNAME',
  GENDER = 'GENDER',
  CREATED_AT = 'CREATED_AT'
}

@InputType()
class ClientOrderSettings {
  @Field(type => OrderDirection)
  orderDirection: OrderDirection = OrderDirection.DESC;

  @Field(type => OrderableFields)
  orderField: OrderableFields = OrderableFields.FULL_NAME;
}
@Resolver(Client)
export class ClientResolver {
  @UseMiddleware(reqWrapper)
  @Query(() => Client)
  async getClient(@Args() { id }: GetClientArgs, @Ctx() context: Context) {
    let response: any = (
      await context.knexConnection
        .from('client')
        // .where('client.id', '413fe')
        .select(context.selectionSet.map(elem => `client.${elem}`))
    )[0];

    let client: any = {};
    /* Rewriting underscored object data to camelCased object client */
    context.selectionSet.map(field => {
      client[_.camelCase(field)] = response[field];
    });

    return client;
  }
}
