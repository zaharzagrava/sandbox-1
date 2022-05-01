import { Field, ID, ObjectType } from "type-graphql";
import { Notification } from "../notification/model";
import { User } from "../user/model";

/* event table model */
@ObjectType({ description: "Event" })
export class Event {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  description!: string;

  @Field(() => Date, { nullable: false })
  scheduled_at!: Date;

  @Field(() => Date, { nullable: false })
  created_at!: Date;

  /* GraphQL-generated */
  @Field(() => [User], { nullable: false })
  participants!: User[];

  @Field(() => User, { nullable: false })
  organizer!: User;

  @Field(() => [Notification], { nullable: false })
  notifications!: Notification[];
}

export interface EventReq {
  id: string;
  name: string;
  description: string;
  scheduled_at: Date;
  created_at: Date;
}
