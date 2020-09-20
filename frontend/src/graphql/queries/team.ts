import { gql } from 'apollo-boost';

export const getAllTeams = gql`
  query getAllTeams {
    getAllTeams {
      _id
      name
      users {
        _id
        name
        email
      }
      tasks {
        _id
        name
      }
    }
  }
`;
