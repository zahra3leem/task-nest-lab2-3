import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class RoleBaseGuard implements CanActivate {
  constructor(private readonly roles: string[]) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    if (!this.roles.includes(request.user.role)) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
