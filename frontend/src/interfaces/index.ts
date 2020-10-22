/* Server data types */
export interface ClientDT {
  id: number;
  client_name?: string;
  email?: string;
  client_password?: string;
  confirmed_at?: Date;
}

export interface TaskDT {
  id: number;
  title?: string;
  task_description?: string;
  is_done?: boolean;
  task_priority?: number;
  due_date?: Date;
}
