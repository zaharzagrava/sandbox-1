import { ArgsType, Field } from 'type-graphql';

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
