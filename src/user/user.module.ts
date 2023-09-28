import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { USER_CLIENT_OPTIONS } from '../options';

@Module({
  imports: [ClientsModule.registerAsync(USER_CLIENT_OPTIONS)],
  controllers: [UserController],
})
export class UserModule {}
