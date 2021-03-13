import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class GetEventArgs {
  @Field(() => String, { nullable: false })
  id!: string;
}
