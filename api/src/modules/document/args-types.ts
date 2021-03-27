import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class GetDocumentArgs {
  @Field(() => String, { nullable: false })
  id!: string;
}

@ArgsType()
export class PostDocumentArgs {
  @Field(() => String, { nullable: false })
  text!: string;
}
