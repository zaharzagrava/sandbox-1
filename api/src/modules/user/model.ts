import { Field, ID, Int, ObjectType } from 'type-graphql';

// eslint-disable-next-line
import { Event } from '../event/model';

/* user table model */
@ObjectType({ description: 'User' })
export class User {
  @Field(() => ID, { nullable: false })
  id!: string;

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

  @Field(() => String, { nullable: true })
  gender?: string;

  @Field(() => Boolean, { nullable: false })
  is_enabled!: boolean;

  @Field(() => String, { nullable: false })
  password!: string;

  @Field(() => Date, { nullable: false })
  born_at!: Date;

  @Field(() => Date, { nullable: false })
  confirmed_at!: Date;

  @Field(() => Date, { nullable: false })
  created_at!: Date;

  @Field(() => Boolean, { nullable: false })
  is_athlete!: boolean;

  @Field(() => Boolean, { nullable: false })
  is_organizer!: boolean;

  @Field(() => Boolean, { nullable: true })
  height?: boolean;

  @Field(() => Boolean, { nullable: true })
  strength?: boolean;

  /* GraphQL-generated */
  @Field(() => Int, { nullable: false })
  age!: number;

  @Field(() => [Event], { nullable: false })
  organizedEvents!: Event[];

  @Field(() => [Event], { nullable: false })
  watchedEvents!: Event[];
}

export interface UserReq {
  id: string;
  email: string;
  full_name: string;
  language: string;
  bio: string;
  phone_number: string;
  gender: string;
  is_enabled: boolean;
  password: string;
  born_at: Date;
  confirmed_at: Date;
  created_at: Date;
  is_athlete: boolean;
  is_organizer: boolean;
  height: number;
  strength: number;
}
