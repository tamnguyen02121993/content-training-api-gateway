import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '..';
import { Role } from '../enums';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
