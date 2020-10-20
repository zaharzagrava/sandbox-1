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
  password: () => string;
}
