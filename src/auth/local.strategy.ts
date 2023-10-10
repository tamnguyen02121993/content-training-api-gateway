import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';
import { compare } from 'bcrypt';
import { lastValueFrom } from 'rxjs';
import { Strategy } from 'passport-local';
import { MODULE_NAMES, USER_PATTERN_NAMES } from '../common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(MODULE_NAMES.USER_CLIENT_MICROSERVICE)
    private readonly userClient: ClientKafka,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    try {
      const user = await lastValueFrom(
        this.userClient.send(USER_PATTERN_NAMES.GET_USER_BY_EMAIL, email),
      );
      if (!user) {
        throw new UnauthorizedException();
      }
      const comparePasswordResult = await compare(password, user.password);

      if (!comparePasswordResult) {
        throw new UnauthorizedException();
      }
      const permissionsByRoles = user.userRoles.map((userRole) => {
        return userRole.role.rolePermissions.map(
          (rolePermission) => rolePermission.permission.name,
        );
      });
      const flatPermissions = [...new Set(permissionsByRoles.flat(2))];
      return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        permissions: flatPermissions,
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
