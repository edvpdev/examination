import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../interfaces/user';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('Users')
    private userModel: Model<User>,
  ) {}

  async findUser(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }
}
