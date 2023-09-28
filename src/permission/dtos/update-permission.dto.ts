import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionDto } from './create-permission.dto';

export class UpdatePermissioneDto extends PartialType(CreatePermissionDto) {
  id: string;
}
