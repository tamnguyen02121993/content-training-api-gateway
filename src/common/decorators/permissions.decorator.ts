import { SetMetadata } from '@nestjs/common';
import { PERMISSIONS_KEY } from '..';
import { Permission } from '../enums';

export const Permissions = (...permissions: Permission[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
