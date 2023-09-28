import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  MODULE_NAMES,
  Role,
  Roles,
  RolesGuard,
  USER_PATTERN_NAMES,
} from '../common';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    @Inject(MODULE_NAMES.USER_CLIENT_MICROSERVICE)
    private readonly userClient: ClientKafka,
  ) {}

  @Roles(Role.Admin, Role.User, Role.SuperAdmin)
  @Get('get-user-by-email')
  async getUserByEmail(@Query('email') email: string) {
    const result = await lastValueFrom(
      this.userClient.send(USER_PATTERN_NAMES.GET_USER_BY_EMAIL, email),
    );
    return result;
  }

  @Roles(Role.Admin, Role.SuperAdmin)
  @Get()
  async getUsers() {
    const result = await lastValueFrom(
      this.userClient.send(USER_PATTERN_NAMES.GET_USERS, {}),
    );
    return result;
  }

  @Roles(Role.SuperAdmin)
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const result = await lastValueFrom(
      this.userClient.send(USER_PATTERN_NAMES.CREATE_USER, createUserDto),
    );
    return result;
  }

  @Roles(Role.SuperAdmin)
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const result = await lastValueFrom(
      this.userClient.send(USER_PATTERN_NAMES.UPDATE_USER, {
        id,
        data: updateUserDto,
      }),
    );
    return result;
  }

  @Roles(Role.SuperAdmin)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const result = await lastValueFrom(
      this.userClient.send(USER_PATTERN_NAMES.DELETE_USER, id),
    );
    return result;
  }
}
