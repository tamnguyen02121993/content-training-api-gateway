import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { RoleController } from './role.controller';
import { USER_CLIENT_OPTIONS } from '../options';

@Module({
  imports: [ClientsModule.registerAsync(USER_CLIENT_OPTIONS)],
  controllers: [RoleController],
})
export class RoleModule {}
