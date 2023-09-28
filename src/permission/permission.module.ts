import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { PermissionController } from './permission.controller';
import { USER_CLIENT_OPTIONS } from '../options';

@Module({
  imports: [ClientsModule.registerAsync(USER_CLIENT_OPTIONS)],
  controllers: [PermissionController],
})
export class PermissionModule {}
