import { model, Model } from 'mongoose';
import * as R from 'ramda';
import { Message } from './types';
import { messageSchema } from './message.schema';

interface UpdatedMessageModel extends Model<Message> {
  upsertOneMessage: (user: Message) => Promise<Message>;
}

messageSchema.statics.upsertOneMessage = async function (message: Message) {
  const existModel = await this.findOne({ _id: message._id || '' });
  if (existModel) {
    existModel.set(message);
    return await existModel.save();
  } else {
    const savedUser = await this.create(message);
    return savedUser;
  }
};

export const messageModel = model<Message, UpdatedMessageModel>(
  'Message',
  messageSchema,
);
