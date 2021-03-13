import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class GetNotificationArgs {
  @Field(() => String, { nullable: false })
  id!: string;
}
