import { gql } from '@apollo/client';

export const GetMessage = gql`
  query GetMessage($filter: GetMessageFilter!) {
    getMessages(filter: $filter) {
      _id
      title
      ip
      content
      create_time
    }
  }
`;

export const UpsertMessage = gql`
  mutation upsertMessage($message: UpsertOneMessageInput) {
    upsertOneMessage(message: $message) {
      recordId
    }
  }
`;

export const RealTimeMessageUpdate = gql`
  subscription subscribeLatestMessage {
    subscribeLatestMessage {
      _id
      title
      ip
      content
      create_time
    }
  }
`;
