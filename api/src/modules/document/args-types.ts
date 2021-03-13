import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class GetDocumentArgs {
  @Field(() => String, { nullable: false })
  id!: string;
}
