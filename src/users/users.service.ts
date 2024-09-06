import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create({ ...createUserDto, role: 'user' });
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id).populate('todos');
  }

  async findOneByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findOneAndUpdate(
      { _id: id },
      updateUserDto,
      {
        new: true,
        runValidators: true,
      },
    );
    return user;
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }
}
