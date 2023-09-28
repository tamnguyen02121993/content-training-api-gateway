import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { USER_CLIENT_OPTIONS } from 'src/options';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [ClientsModule.registerAsync(USER_CLIENT_OPTIONS), PassportModule],
  controllers: [AuthController],
  providers: [JwtStrategy, LocalStrategy],
  exports: [AuthModule],
})
export class AuthModule {}
