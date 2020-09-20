import { gql } from 'apollo-boost';

export const getTaskById = gql`
  query getTaskById($id: String!) {
    getTaskById(id: $id) {
      _id
      name
      groups {
        _id
        name
        description
        items {
          _id
          name
          status
          start_date
          end_date
          description
          users {
            _id
            name
            email
          }
        }
      }
    }
  }
`;
