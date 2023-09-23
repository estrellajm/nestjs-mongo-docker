import {
  IsNotEmpty,
  IsString,
  // IsNumber,
  MaxLength,
  MinLength,
} from 'class-validator';
import { iUser } from '../entities/users.interface';
import { Types } from 'mongoose';

export class CreateUserDto implements iUser {
  _id: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(300)
  description: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  created: Date;
  updated: Date;

  // @IsNumber()
  // @IsNotEmpty()
  // price: number;
}
