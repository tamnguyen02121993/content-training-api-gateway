import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModuleAsyncOptions, Transport } from '@nestjs/microservices';
import { MODULE_NAMES } from 'src/common';

export const USER_CLIENT_OPTIONS: ClientsModuleAsyncOptions = {
  clients: [
    {
      name: MODULE_NAMES.USER_CLIENT_MICROSERVICE,
      imports: [ConfigModule],
      useFactory(configService: ConfigService) {
        return {
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'user-content-training',
              brokers: [`localhost:${configService.get<number>('KAFKA_PORT')}`],
            },
            consumer: {
              groupId: 'user-content-training-consumer',
            },
          },
        };
      },
      inject: [ConfigService],
    },
  ],
};
