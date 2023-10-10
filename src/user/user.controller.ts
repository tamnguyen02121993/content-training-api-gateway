import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  MODULE_NAMES,
  Permission,
  Permissions,
  TableParamsDto,
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

  @Permissions(Permission.ViewUserByEmail)
  @Get('get-user-by-email')
  async getUserByEmail(@Query('email') email: string) {
    const result = await lastValueFrom(
      this.userClient.send(USER_PATTERN_NAMES.GET_USER_BY_EMAIL, email),
    );
    return result;
  }

  @Permissions(Permission.ViewUser)
  @Get()
  async getUsers(
    @Query() tableParamsDto: TableParamsDto,
    @Query('currentPage', ParseIntPipe) currentPage: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
  ) {
    const result = await lastValueFrom(
      this.userClient.send(USER_PATTERN_NAMES.GET_USERS, {
        ...tableParamsDto,
        currentPage,
        pageSize,
      }),
    );
    return result;
  }

  @Permissions(Permission.CreateUser)
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const result = await lastValueFrom(
      this.userClient.send(USER_PATTERN_NAMES.CREATE_USER, createUserDto),
    );
    return result;
  }

  @Permissions(Permission.UpdateUser)
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

  @Permissions(Permission.DeleteUser)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const result = await lastValueFrom(
      this.userClient.send(USER_PATTERN_NAMES.DELETE_USER, id),
    );
    return result;
  }

  @Post('assign-roles-to-user')
  async assignRolesToUser(
    @Body('userId') userId: string,
    @Body('roleIds') roleIds: string[],
  ) {
    const result = await lastValueFrom(
      this.userClient.send(USER_PATTERN_NAMES.ASSIGN_ROLES_TO_USER, {
        userId,
        roleIds,
      }),
    );
    return result;
  }
}
