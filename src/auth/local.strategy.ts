/* eslint-disable prettier/prettier */
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidateUserDto } from '../users/dto/validate-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  async validate(validateUserDto: ValidateUserDto): Promise<any> {
    const user = await this.authService.validateUser(validateUserDto);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
    // eslint-disable-next-line prettier/prettier
  }
}
