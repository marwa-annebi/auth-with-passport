import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ValidateUserDto } from '../users/dto/validate-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async validateUser(validateUserDto: ValidateUserDto): Promise<any> {
    const user = await this.usersService.findOne(validateUserDto.email);
    const passwordValid = await bcrypt.compare(
      validateUserDto.password,
      user.password,
    );
    if (user && passwordValid) {
      //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
