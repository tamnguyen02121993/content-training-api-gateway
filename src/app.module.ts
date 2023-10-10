import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ClientsModule } from '@nestjs/microservices';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { HttpExceptionFilter, PermissionsGuard } from './common';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { USER_CLIENT_OPTIONS } from './options';
import { AppController } from './app.controller';
import { JwtAuthGuard } from './common';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ClientsModule.registerAsync(USER_CLIENT_OPTIONS),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    AuthModule,
    UserModule,
    RoleModule,
    PermissionModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
})
export class AppModule {}
