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
