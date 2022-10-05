import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ValidateUserDto } from '../users/dto/validate-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(validateUserDto: ValidateUserDto): Promise<any> {
    const { email, password } = validateUserDto;
    const user = await this.usersService.findOne(email);
    const passwordValid = await bcrypt.compare(password, user.password);

    if (user && passwordValid) {
      //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user._doc.email, sub: user._doc._id };
    console.log(user._doc.email);

    return {
      access_token: this.jwtService.sign(payload),
      payload: payload,
    };
  }
}
