import { Mongoose, connect as conn } from 'mongoose';

export const db = () => {
  let MongoDbClient: Promise<Mongoose | undefined>;
  const connect = () => {
    if (!MongoDbClient) {
      const connectionString = `mongodb://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}`;
      MongoDbClient = conn(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        keepAlive: true,
        keepAliveInitialDelay: 3000000,
      });
    }

    return MongoDbClient;
  };

  return { connect };
};
