import { ArgsType, Field, ID, InputType } from "type-graphql";

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

@InputType()
export class PutDocumentFields {
  @Field(() => String, { nullable: true })
  text?: string;
}

@ArgsType()
export class PutDocumentArgs {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => PutDocumentFields, { nullable: false })
  fields!: PutDocumentFields;
}

@ArgsType()
export class DeleteDocumentArgs {
  @Field(() => ID, { nullable: false })
  id!: string[];
}
