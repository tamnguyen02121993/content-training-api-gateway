import { Body, Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Request } from 'express';
import { lastValueFrom } from 'rxjs';
import { AUTH_PATTERN_NAMES, MODULE_NAMES, Public } from '../common';
import { LocalAuthGuard } from '../common/';
import { ChangePasswordDto, ResetPasswordDto } from './dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auths')
@Controller('auths')
export class AuthController {
  constructor(
    @Inject(MODULE_NAMES.USER_CLIENT_MICROSERVICE)
    private readonly userClient: ClientKafka,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(@Req() req: Request) {
    const result = await lastValueFrom(
      this.userClient.send(AUTH_PATTERN_NAMES.SIGN_IN, req.user),
    );

    return result;
  }

  @Public()
  @Post('/request-reset-password')
  async requestResetPassword(@Body('email') email: string) {
    const result = await lastValueFrom(
      this.userClient.send(AUTH_PATTERN_NAMES.REQUEST_RESET_PASSWORD, email),
    );

    return result;
  }

  @Public()
  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    const result = await lastValueFrom(
      this.userClient.send(AUTH_PATTERN_NAMES.RESET_PASSWORD, resetPasswordDto),
    );

    return result;
  }

  @Post('change-password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    const result = await lastValueFrom(
      this.userClient.send(
        AUTH_PATTERN_NAMES.CHANGE_PASSWORD,
        changePasswordDto,
      ),
    );

    return result;
  }
}
