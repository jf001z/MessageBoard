import { Schema } from 'mongoose';
import { v4 as uuidV4 } from 'uuid';

export const messageSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidV4(),
    },
    ip: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    create_time: {
      type: Number,
      required: true,
    },
  },
  { collection: 'message' },
);
