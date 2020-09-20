import * as express from 'express';
import { Mongoose } from 'mongoose';
import { ApolloServer, PubSub } from 'apollo-server-express';
import { ContextFunction, Context } from 'apollo-server-core';
import { db as DB } from './utils';
import { schema } from './schema';
import { exit } from 'process';

interface ExpressContext {
  req: express.Request;
  res: express.Response;
}

const db = DB();

const maybeGetuserIpAddress = (request: express.Request): string | null => {
  const headers = request.headers;
  if (!headers) return null;
  const ipAddress = headers['x-forwarded-for'];
  if (!ipAddress) return null;
  return ipAddress as string;
};

db.connect()
  .then((dbClient: Mongoose | undefined) => {
    if (dbClient) {
      const app = express();
      const pubsub = new PubSub();
      const server = new ApolloServer({
        schema,
        playground: process.env.NODE_ENV !== 'PROD',
        context: (context: any) => {
          return {
            db: dbClient,
            pubsub,
            requestIp: context.req.ip,
          };
        },
        introspection: true,
        engine: {
          debugPrintReports: true,
        },
        // subscriptions: {
        //   onConnect: (connectionParams, webSocket, context) => {
        //     // ...
        //   },
        //   onDisconnect: (webSocket, context) => {
        //     // ...
        //   },
        // },
      });
      server.applyMiddleware({ app });
      const PORT = 4000;

      app.listen(PORT, () => {
        // eslint-disable-next-line no-console
        console.log(
          `Server is running in http://localhost:${PORT}${server.graphqlPath}`,
        );
      });
    } else {
      // eslint-disable-next-line no-console
      console.log('cannot connect to db.');
      exit();
    }
  })
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.log(`cannot connect to db. ${e}`);
    exit();
  });
