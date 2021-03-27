import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class GetNotificationArgs {
  @Field(() => String, { nullable: false })
  id!: string;
}

@ArgsType()
export class PostNotificationArgs {
  @Field(() => String, { nullable: false })
  text!: string;
}
