import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';

export class RoleDto extends PartialType(CreateRoleDto) {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
