import * as express from 'express';
import { Mongoose } from 'mongoose';
import { ApolloServer, PubSub } from 'apollo-server-express';
import { db as DB } from './utils';
import { schema } from './schema';
import { exit } from 'process';

const db = DB();

db.connect()
  .then((dbClient: Mongoose | undefined) => {
    if (dbClient) {
      const app = express();
      const pubsub = new PubSub();
      const server = new ApolloServer({
        schema,
        playground: process.env.NODE_ENV !== 'PROD',
        context: { db: dbClient, pubsub },
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
