import { ArgsType, Field, ID, InputType } from "type-graphql";

@ArgsType()
export class GetEventsArgs {
  @Field(() => String, { nullable: false })
  id!: string;
}

@ArgsType()
export class GetLatestEventsArgs {
  @Field(() => String, { nullable: false })
  id!: string;
}

@ArgsType()
export class GetEventArgs {
  @Field(() => String, { nullable: false })
  id!: string;
}

@ArgsType()
export class PostEventArgs {
  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  description!: string;

  @Field(() => Date, { nullable: false })
  scheduled_at!: Date;
}

@InputType()
export class PutEventFields {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;
}

@ArgsType()
export class PutEventArgs {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => PutEventFields, { nullable: false })
  fields!: PutEventFields;
}

@ArgsType()
export class DeleteEventArgs {
  @Field(() => ID, { nullable: false })
  id!: string[];
}
