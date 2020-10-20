import { Model } from 'sequelize';

// export interface ClientDT {
//   id: number;
//   full_name: string;
//   username: string;
//   website: string;
//   bio: string;
//   email: string;
//   phone_number: string;
//   gender: string;
//   password: string;
//   confirmed_at?: Date;
// }

// export interface TaskDT {
//   id: number;
//   title: string;
//   task_description: string;
//   is_done: boolean;
//   task_priority: number;
//   due_date: Date;
// }

// export interface CookiesDT {
//   idToken: string;
// }

export interface ErrorType {
  status: number;
  message: string;
}

export type Callback<T> = (error: ErrorType | null, data?: T) => void;

type NonAbstract<T> = { [P in keyof T]: T[P] }; // "abstract" gets lost here
type Constructor<T> = new () => T;
export type NonAbstractTypeOfModel<T> = Constructor<T> &
  NonAbstract<typeof Model>;

export interface ClientDTO {
  id: number;
  full_name: string;
  username: string;
  website: string;
  bio: string;
  avatar: string;
  email: string;
  phone_number: string;
  gender: string;
  password: () => string;
}

export interface CreateClientDTO {
  id?: number;
  full_name?: string;
  username: string;
  website?: string;
  bio?: string;
  avatar?: string;
  email: string;
  phone_number?: string;
  gender?: string;
  password: string;
}
