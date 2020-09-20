import { Document } from 'mongoose';

export interface Message extends Document {
  title: string;
  content: string;
  ip: string;
  create_time: number;
}
