interface GraphqlBaseType {
  _id: string;
  __typename?: string;
}

export const enum Status {
  STUCK = 'STUCK',
  WORKING = 'WORKING',
  DONE = 'DONE',
  REVIEW = 'REVIEW',
  NONE = 'NONE',
}
export interface User extends GraphqlBaseType {
  name: string;
  email: string;
}

export interface Item extends GraphqlBaseType {
  name: string;
  user_ids?: string[];
  status: Status;
  start_date: number;
  end_date: number;
  users: Partial<User>[];
}

export interface Group extends GraphqlBaseType {
  name: string;
  color: string;
  item_ids?: string[];
  description?: string;
  items?: Partial<Item>[];
}

export interface Task extends GraphqlBaseType {
  name: string;
  group_ids: string[];
  groups: Partial<Group>[];
}

export interface Team extends GraphqlBaseType {
  name: string;
  user_ids?: string[];
  task_ids?: string[];
  tasks?: Partial<Task>[];
  users?: Partial<User>[];
}
