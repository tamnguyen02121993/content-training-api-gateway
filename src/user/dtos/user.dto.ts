import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UserDto extends PartialType(CreateUserDto) {
  id: string;
  updatedBy: string;
  createdAt?: Date;
  updatedAt?: Date;
}
