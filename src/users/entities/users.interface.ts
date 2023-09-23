import { Types } from 'mongoose';

export interface iUser {
  _id: Types.ObjectId;
  name: string;
  password: string;
  email: string;
  description: string;
  created: Date;
  updated: Date;
}
