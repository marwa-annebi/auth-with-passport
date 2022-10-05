import { Role } from 'src/roles/role.enum';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;
  @IsString()
  userName: string;
  @IsString()
  password: string;
  @IsString()
  roles: Role[];
}
