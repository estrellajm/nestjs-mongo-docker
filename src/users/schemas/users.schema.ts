// src/schemas/user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { iUser } from '../entities/users.interface';

export type UserDocument = User & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class User implements iUser {
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  password: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  birthday: string;

  @Prop()
  email: string;

  @Prop()
  created: Date;

  @Prop()
  updated: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
