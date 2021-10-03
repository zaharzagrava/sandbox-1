import { ArgsType, Field, ID, InputType } from "type-graphql";

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

@InputType()
export class PutNotificationFields {
  @Field(() => String, { nullable: true })
  text?: string;
}

@ArgsType()
export class PutNotificationArgs {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => PutNotificationFields, { nullable: false })
  fields!: PutNotificationFields;
}

@ArgsType()
export class DeleteNotificationArgs {
  @Field(() => ID, { nullable: false })
  id!: string[];
}
