import { iUser } from './users.interface';

export class User implements iUser {
  name: string;
  password: string;
  email: string;
  description: string;
  created: Date;
  updated: Date;
}
