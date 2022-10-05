import { User } from './../users/entities/user.entity';
import { Role } from './role.enum';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requireRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requireRoles) {
      return true;
    }
    // const { user } = context.switchToHttp().getRequest();
    const user: User = {
      email: 'marwaannebi25@gmail.com',
      password: 'marwa1234',
      userName: 'marwa',
      roles: [Role.User],
    };
    return requireRoles.some((role) => user.roles?.includes(role));
  }
}
