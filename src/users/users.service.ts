import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { hash } from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto) {
    const { email, userName, password } = createUserDto;
    const saltOrRounds = 10;
    const hashedPassword = await hash(password, saltOrRounds);
    return await new this.userModel({
      email,
      userName,
      password: hashedPassword,
    }).save();
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOne(email: string) {
    return this.userModel.findOne({ email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
