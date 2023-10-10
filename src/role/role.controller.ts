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
  ROLE_PATTERN_NAMES,
  Permission,
  Permissions,
  TableParamsDto,
} from '../common';
import { CreateRoleDto, UpdateRoleDto } from './dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('roles')
export class RoleController {
  constructor(
    @Inject(MODULE_NAMES.USER_CLIENT_MICROSERVICE)
    private readonly userClient: ClientKafka,
  ) {}

  @Permissions(Permission.ViewPermissionById)
  @Get(':id')
  async getRoleById(@Param('id') id: string) {
    const result = await lastValueFrom(
      this.userClient.send(ROLE_PATTERN_NAMES.GET_ROLE_BY_ID, id),
    );
    return result;
  }

  @Permissions(Permission.ViewRole)
  @Get()
  async getRoles(
    @Query() tableParamsDto: TableParamsDto,
    @Query('currentPage', ParseIntPipe) currentPage: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
  ) {
    const result = await lastValueFrom(
      this.userClient.send(ROLE_PATTERN_NAMES.GET_ROLES, {
        ...tableParamsDto,
        currentPage,
        pageSize,
      }),
    );
    return result;
  }

  @Permissions(Permission.CreateRole)
  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    const result = await lastValueFrom(
      this.userClient.send(ROLE_PATTERN_NAMES.CREATE_ROLE, createRoleDto),
    );
    return result;
  }

  @Permissions(Permission.UpdateRole)
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

  @Permissions(Permission.DeleteRole)
  @Delete(':id')
  async deleteRole(@Param('id') id: string) {
    const result = await lastValueFrom(
      this.userClient.send(ROLE_PATTERN_NAMES.DELETE_ROLE, id),
    );
    return result;
  }
}
