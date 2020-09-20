import ApolloClient from 'apollo-boost';

export const client = new ApolloClient({
  uri: process.env.API_URL,
});
