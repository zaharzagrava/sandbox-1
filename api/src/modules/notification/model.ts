import { Field, ID, ObjectType } from 'type-graphql';
import { Event } from '../event/model';

/* notification table model */
@ObjectType({ description: 'Notification' })
export class Notification {
  @Field((type) => ID, { nullable: false })
  id!: string;

  @Field((type) => String, { nullable: false })
  text!: string;

  @Field((type) => Date, { nullable: false })
  created_at!: Date;

  /* GraphQL-generated */
  @Field(() => Event, { nullable: false })
  event!: Event;
}

export interface NotificationReq {
  id: string;
  text: string;
  created_at: Date;
}
