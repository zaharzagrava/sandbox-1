import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class GetUserArgs {
  @Field(() => String, { nullable: false })
  id!: string;
}
