interface GraphqlBaseType {
  _id: string;
  __typename?: string;
}

export const enum GetMessageFilter {
  TODAY = 'TODAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  ALL = 'ALL',
}

export interface UpsertOneMessageInput {
  _id?: string;
  title: string;
  content: string;
}

export interface Message extends GraphqlBaseType {
  ip: string;
  title: string;
  content: string;
  create_time: number;
}
