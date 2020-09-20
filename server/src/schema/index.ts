import {
  makeExecutableSchema,
  mergeTypeDefs,
  mergeResolvers,
} from 'graphql-tools';
import { commonGqlTypes } from './common';
import { messageGqlTypes, messageResolver } from './message';

const resolvers = mergeResolvers([messageResolver]);
// How to module graphql typeDefs:
// https://www.graphql-tools.com/docs/merge-typedefs/
// graphql-tools loadfilessync not working, needs further investigations later.

export const allTypeDefs = mergeTypeDefs([commonGqlTypes, messageGqlTypes]);
export const schema = makeExecutableSchema({
  typeDefs: allTypeDefs,
  resolvers,
});
