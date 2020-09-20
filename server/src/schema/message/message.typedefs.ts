import { gql } from 'apollo-server-express';

export const messageGqlTypes = gql`
  type Message {
    _id: String!
    title: String!
    content: String!
    ip: String!
    create_time: Float!
  }
  input UpsertOneMessageInput {
    _id: String
    title: String
    content: String
    ip: String
    create_time: Float
  }
  enum GetMessageFilter {
    TODAY
    WEEK
    MONTH
    ALL
  }
  type Query {
    getMessages(filter: GetMessageFilter!): [Message]!
  }
  type Mutation {
    upsertOneMessage(message: UpsertOneMessageInput): IdOutputType
  }
  type Subscription {
    subscribeLatestMessage: Message
  }
`;
