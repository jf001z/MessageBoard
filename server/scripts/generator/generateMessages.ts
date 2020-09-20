import * as faker from 'faker';
import { v4 as uuidV4 } from 'uuid';
import { messageModel, Message } from '../../src/models';

export const generateMessages = async (count: number): Promise<string[]> => {
  const counts = new Array(count).fill(1);
  const messages: Message[] = counts.map(
    () =>
      ({
        _id: uuidV4(),
        title: faker.lorem.sentences(1),
        content: faker.lorem.paragraph(20),
        ip: faker.internet.ip(),
        create_time: faker.date.past(0, new Date()).getTime(),
      } as Message),
  );
  const savedUser = await messageModel.insertMany(messages);
  return savedUser.map((message) => message._id);
};
