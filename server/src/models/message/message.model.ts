import { model, Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import * as R from 'ramda';
import { Message } from './types';
import { messageSchema } from './message.schema';

interface UpdatedMessageModel extends Model<Message> {
  upsertOneMessage: (message: Partial<Message>) => Promise<Message>;
}

messageSchema.statics.upsertOneMessage = async function (
  message: Partial<Message>,
) {
  const existModel = await this.findOne({ _id: message._id || '' });
  if (existModel) {
    existModel.set(message);
    return await existModel.save();
  } else {
    const savedMessage = await this.create({
      ...message,
      _id: uuidv4(),
      create_time: new Date().getTime(),
    });
    return savedMessage;
  }
};

export const messageModel = model<Message, UpdatedMessageModel>(
  'Message',
  messageSchema,
);
