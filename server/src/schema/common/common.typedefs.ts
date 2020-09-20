import { gql } from 'apollo-server-express';
export const commonGqlTypes = gql`
  scalar Date
  type IdOutputType {
    recordId: String
  }
  type IdsOutputType {
    recordIds: [String]
  }
`;
