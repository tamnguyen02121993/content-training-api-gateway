import {
  Controller,
  Get,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import {
  AUTH_PATTERN_NAMES,
  MODULE_NAMES,
  PERMISSION_PATTERN_NAMES,
  ROLE_PATTERN_NAMES,
  USER_PATTERN_NAMES,
} from './common';
import { ClientKafka } from '@nestjs/microservices';

@Controller('apps')
export class AppController implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject(MODULE_NAMES.USER_CLIENT_MICROSERVICE)
    private readonly userClient: ClientKafka,
  ) {}
  async onModuleDestroy() {
    await this.userClient.close();
  }

  async onModuleInit() {
    const userPatterns = Object.values(USER_PATTERN_NAMES);
    const rolePatterns = Object.values(ROLE_PATTERN_NAMES);
    const permissionPatterns = Object.values(PERMISSION_PATTERN_NAMES);
    const authPatterns = Object.values(AUTH_PATTERN_NAMES);
    const patterns = [
      ...userPatterns,
      ...rolePatterns,
      ...permissionPatterns,
      ...authPatterns,
    ];
    for (const pattern of patterns) {
      this.userClient.subscribeToResponseOf(pattern);
    }
    await this.userClient.connect();
  }
}
