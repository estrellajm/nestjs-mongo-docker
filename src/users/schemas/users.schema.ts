// src/schemas/user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  // @Prop({ required: true })
  // price: number;

  @Prop({ required: true })
  title: string;

  @Prop()
  birthday: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
