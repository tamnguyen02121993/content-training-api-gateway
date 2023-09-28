import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { MODULE_NAMES, ROLE_PATTERN_NAMES, Role, Roles } from '../common';
import { CreateRoleDto, UpdateRoleDto } from './dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('roles')
export class RoleController {
  constructor(
    @Inject(MODULE_NAMES.USER_CLIENT_MICROSERVICE)
    private readonly userClient: ClientKafka,
  ) {}

  @Roles(Role.User, Role.Admin, Role.SuperAdmin)
  @Get(':id')
  async getRoleById(@Param('id') id: string) {
    const result = await lastValueFrom(
      this.userClient.send(ROLE_PATTERN_NAMES.GET_ROLE_BY_ID, id),
    );
    return result;
  }

  @Roles(Role.User, Role.Admin, Role.SuperAdmin)
  @Get()
  async getRoles() {
    const result = await lastValueFrom(
      this.userClient.send(ROLE_PATTERN_NAMES.GET_ROLES, {}),
    );
    return result;
  }

  @Roles(Role.SuperAdmin)
  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    const result = await lastValueFrom(
      this.userClient.send(ROLE_PATTERN_NAMES.CREATE_ROLE, createRoleDto),
    );
    return result;
  }

  @Roles(Role.SuperAdmin)
  @Put(':id')
  async updateRole(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    const result = await lastValueFrom(
      this.userClient.send(ROLE_PATTERN_NAMES.UPDATE_ROLE, {
        id,
        data: updateRoleDto,
      }),
    );
    return result;
  }

  @Roles(Role.SuperAdmin)
  @Delete(':id')
  async deleteRole(@Param('id') id: string) {
    const result = await lastValueFrom(
      this.userClient.send(ROLE_PATTERN_NAMES.DELETE_ROLE, id),
    );
    return result;
  }
}
