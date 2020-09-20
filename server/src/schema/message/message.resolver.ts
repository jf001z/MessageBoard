import { PubSub } from 'apollo-server-express';
import { messageModel, Message } from '../../models';

enum GetMessageFilter {
  TODAY = 'TODAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  ALL = 'ALL',
}

export const messageResolver = {
  Query: {
    getMessages: async (
      _: unknown,
      { filter }: { filter: GetMessageFilter },
    ): Promise<Message[]> => {
      const today = new Date();
      switch (filter) {
        case GetMessageFilter.ALL:
          return await messageModel.find().exec();
        case GetMessageFilter.MONTH:
          const month = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          month.setHours(0, 0, 0, 0);
          return await messageModel
            .find({ create_time: { $gte: month.getTime() } })
            .exec();
        case GetMessageFilter.WEEK:
          const week = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          week.setHours(0, 0, 0, 0);
          return await messageModel
            .find({ create_time: { $gte: week.getTime() } })
            .exec();
        default:
          today.setHours(0, 0, 0, 0);
          return await messageModel
            .find({ create_time: { $gte: today.getTime() } })
            .exec();
      }
    },
  },
  Mutation: {
    upsertOneMessage: async (
      _: unknown,
      { message }: { message: Message },
      { pubsub }: { pubsub: PubSub },
    ): Promise<{ recordId: string }> => {
      const savedMessage = await messageModel.upsertOneMessage(message);
      pubsub.publish('latestMessage', { message: savedMessage });
      return { recordId: savedMessage._id };
    },
  },
  Subscription: {
    subscribeLatestMessage: {
      resolve: async ({ message }: { message: Message }): Promise<Message> => {
        return message;
      },
      subscribe: (_: any, __: any, { pubsub }: { pubsub: PubSub }) =>
        pubsub.asyncIterator<Message>(['latestMessage']),
    },
  },
};
