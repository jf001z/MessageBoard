import * as express from 'express';
import * as http from 'http';
import { Mongoose } from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import { PubSub } from 'graphql-subscriptions';
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
        context: ({ req, connection }) => {
          return {
            db: dbClient,
            pubsub,
            requestIp: req.ip,
          };
        },
        introspection: true,
        engine: {
          debugPrintReports: true,
        },
        subscriptions: {
          onConnect: () => {
            // ...
            console.log('connected to WS');
          },
          onDisconnect: () => {
            // ...
            console.log('disconnected to WS');
          },
        },
      });
      server.applyMiddleware({ app });

      const httpServer = http.createServer(app);
      server.installSubscriptionHandlers(httpServer);
      const PORT = 4000;

      httpServer.listen(PORT, () => {
        // eslint-disable-next-line no-console
        console.log(
          `Server is running in http://localhost:${PORT}${server.graphqlPath}`,
        );
        const subPath = server.subscriptionsPath;
        console.log(`Subscriptions are at ws://localhost:${PORT}${subPath}`);
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
