import { PubSub } from 'apollo-server-express';
import { messageModel, Message } from '../../models';

enum GetMessageFilter {
  TODAY = 'TODAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  ALL = 'ALL',
}

export const messageResolver = {
  Subscription: {
    subscribeLatestMessage: {
      resolve: ({ message }: { message: Message }): Message => {
        console.log('subscribeLatestMessage: ', message._id);
        return message;
      },
      subscribe: (_: any, __: any, { pubsub }: { pubsub: PubSub }) => {
        return pubsub.asyncIterator('subscribeLatestMessage');
      },
    },
  },
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
      { message }: { message: Partial<Message> },
      { pubsub, requestIp }: { pubsub: PubSub; requestIp: string },
    ): Promise<{ recordId: string }> => {
      const savedMessage = await messageModel.upsertOneMessage({
        ...message,
        ip: requestIp,
      } as Partial<Message>);
      pubsub.publish('subscribeLatestMessage', {
        message: savedMessage,
      });
      return { recordId: savedMessage._id };
    },
  },
};
