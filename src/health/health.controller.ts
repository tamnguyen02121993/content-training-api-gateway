import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KafkaOptions, Transport } from '@nestjs/microservices';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';
import { Public } from '../common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Healths')
@Controller('healths')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly microservice: MicroserviceHealthIndicator,
    private readonly configService: ConfigService,
    private readonly http: HttpHealthIndicator,
  ) {}

  @Public()
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      async () =>
        this.http.pingCheck(
          'api-gateway',
          `${this.configService.get<number>(
            'GATEWAY_HOST',
          )}:${this.configService.get<number>('GATEWAY_PORT')}/swagger/`,
        ),
      async () =>
        this.microservice.pingCheck<KafkaOptions>('user-management', {
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'user-content-training',
              brokers: [
                `localhost:${this.configService.get<number>('KAFKA_PORT')}`,
              ],
            },
            consumer: {
              groupId: 'user-content-training-consumer',
            },
          },
        }),
      async () =>
        this.microservice.pingCheck<KafkaOptions>('notification', {
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'mail-content-training',
              brokers: [
                `localhost:${this.configService.get<number>('KAFKA_PORT')}`,
              ],
            },
            consumer: {
              groupId: 'mail-content-training-consumer',
            },
          },
        }),
    ]);
  }
}
