import { Field, ID, ObjectType } from 'type-graphql';
import { User } from '../user/model';

/* document table model */
@ObjectType({ description: 'Document' })
export class Document {
  @Field((type) => ID, { nullable: false })
  id!: string;

  @Field((type) => String, { nullable: false })
  text!: string;

  @Field((type) => Date, { nullable: false })
  created_at!: Date;

  /* GraphQL-generated */
  @Field(() => User, { nullable: false })
  author!: User;
}

export interface DocumentReq {
  id: string;
  text: string;
  created_at: Date;
}
