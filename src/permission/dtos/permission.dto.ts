import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionDto } from './create-permission.dto';

export class PermissionDto extends PartialType(CreatePermissionDto) {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
