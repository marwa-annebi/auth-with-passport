import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { hash } from 'bcrypt';
import { promisify } from 'util';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto) {
    const { email, userName, password, roles } = createUserDto;
    const saltOrRounds = 10;
    const hashedPassword = await hash(password, saltOrRounds);
    return await new this.userModel({
      email,
      userName,
      password: hashedPassword,
      roles,
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

  async encryption(textToEncrypt: string) {
    const iv = randomBytes(16);
    const password = 'Password used to generate key';
    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);
    // const textToEncrypt = 'Nest';
    const encryptedText = Buffer.concat([
      cipher.update(textToEncrypt),
      cipher.final(),
    ]);
    return encryptedText;
  }
}
