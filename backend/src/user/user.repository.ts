import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(email: string, city: string): Promise<User> {
    const user = new this.userModel({ email, city: [city] });
    return await user.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  async addCityToUser(email: string, city: string): Promise<User> {
    return await this.userModel
      .findOneAndUpdate(
        { email },
        { $addToSet: { city } }, // $addToSet ensures no duplicates
        { new: true },
      )
      .exec();
  }

  async updateUser(email: string, update: Partial<User>): Promise<User> {
    return await this.userModel
      .findOneAndUpdate({ email }, update, { new: true })
      .exec();
  }

  async deleteUser(email: string): Promise<User | null> {
    return await this.userModel.findOneAndDelete({ email }).exec();
  }
}
