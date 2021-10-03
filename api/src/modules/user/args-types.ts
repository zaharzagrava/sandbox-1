import { ArgsType, Field, ID, InputType } from "type-graphql";

@ArgsType()
export class GetUserArgs {
  @Field(() => String, { nullable: false })
  id!: string;
}

@ArgsType()
export class PostUserArgs {
  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: false })
  full_name!: string;

  @Field(() => String, { nullable: false })
  language!: string;

  @Field(() => String, { nullable: true })
  bio?: string;

  @Field(() => String, { nullable: true })
  phone_number?: string;

  @Field(() => String, { nullable: false })
  gender!: string;

  @Field(() => String, { nullable: false })
  password!: string;

  @Field(() => Date, { nullable: false })
  born_at!: Date;

  @Field(() => Boolean, { nullable: false })
  is_athlete!: boolean;

  @Field(() => Boolean, { nullable: false })
  is_organizer!: boolean;

  @Field(() => Number, { nullable: true })
  height?: number;

  @Field(() => Number, { nullable: true })
  strength?: number;
}

@InputType()
export class PutUserFields {
  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  full_name?: string;

  @Field(() => String, { nullable: true })
  language?: string;

  @Field(() => String, { nullable: true })
  bio?: string;

  @Field(() => String, { nullable: true })
  phone_number?: string;

  @Field(() => String, { nullable: true })
  gender?: string;

  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => Date, { nullable: true })
  born_at?: Date;

  @Field(() => Boolean, { nullable: true })
  is_athlete?: boolean;

  @Field(() => Boolean, { nullable: true })
  is_organizer?: boolean;

  @Field(() => Number, { nullable: true })
  height?: number;

  @Field(() => Number, { nullable: true })
  strength?: number;
}

@ArgsType()
export class PutUserArgs {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => PutUserFields, { nullable: false })
  fields!: PutUserFields;
}

@ArgsType()
export class DeleteUserArgs {
  @Field(() => ID, { nullable: false })
  id!: string[];
}
