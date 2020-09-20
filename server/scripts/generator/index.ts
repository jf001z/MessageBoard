import * as dotenv from 'dotenv';
import { exit } from 'process';
import { Mongoose } from 'mongoose';
import { db as DB } from '../../src/utils';
import { generateMessages } from './generateMessages';

dotenv.config();
const db = DB();
db.connect()
  .then(async (dbClient: Mongoose | undefined) => {
    if (dbClient) {
      const messageCount = 100;

      try {
        const savedMessageIds = await generateMessages(messageCount);

        console.log(
          `${savedMessageIds.length} records have created and saved to db`,
        );
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log('cannot connect to db.');
    }
  })
  .catch((e) => {
    console.log(`cannot connect to db. ${e}`);
  })
  .finally(() => {
    exit();
  });
