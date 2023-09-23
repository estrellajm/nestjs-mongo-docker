import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/users.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(createUser: CreateUserDto) {
    try {
      const isUser = await this.userModel.findOne({
        email: createUser.email,
      });
      if (isUser)
        throw new HttpException(
          'User already exist, try resetting your password',
          HttpStatus.CONFLICT,
        );
      createUser.password = await bcrypt
        .hash(createUser.password, 10)
        .then((r: string) => r);
      return await new this.userModel(createUser).save();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await this.userModel.findOne({
        email: email,
      });
      return user && (await bcrypt.compare(password, user.password))
        ? await this.jwtService.signAsync({ email, _id: user._id })
        : new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  async updatePassword(
    user: User,
    currentPassword: string,
    newPassword: string,
  ): Promise<User | HttpException> {
    try {
      const User = await this.userModel.findById(user._id);
      if (await bcrypt.compare(currentPassword, User.password)) {
        if (await bcrypt.compare(newPassword, User.password))
          return new HttpException(
            "you've enter the same password",
            HttpStatus.EXPECTATION_FAILED,
          );
        User.password = await bcrypt.hash(newPassword, 10);
        return await new this.userModel(User).save();
      }
      return new HttpException(
        'Wrong password entered',
        HttpStatus.EXPECTATION_FAILED,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find();
  }

  async findOne(id: string): Promise<UserDocument> {
    try {
      return this.userModel.findById(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  async remove(id: string) {
    try {
      return this.userModel.findByIdAndRemove(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async deleteMultiple(ids: string[]): Promise<void> {
    try {
      await this.userModel.deleteMany({ _id: { $in: ids } });
    } catch (error) {
      throw new HttpException(error, HttpStatus.EXPECTATION_FAILED);
    }
  }
}
