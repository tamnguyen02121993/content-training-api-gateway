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
import { MODULE_NAMES, PERMISSION_PATTERN_NAMES, Role, Roles } from '../common';
import { CreatePermissionDto } from './dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionController {
  constructor(
    @Inject(MODULE_NAMES.USER_CLIENT_MICROSERVICE)
    private readonly userClient: ClientKafka,
  ) {}

  @Roles(Role.User, Role.Admin, Role.SuperAdmin)
  @Get(':id')
  async getPermissionById(@Param('id') id: string) {
    const result = await lastValueFrom(
      this.userClient.send(PERMISSION_PATTERN_NAMES.GET_PERMISSION_BY_ID, id),
    );
    return result;
  }

  @Roles(Role.User, Role.Admin, Role.SuperAdmin)
  @Get()
  async getPermissions() {
    const result = await lastValueFrom(
      this.userClient.send(PERMISSION_PATTERN_NAMES.GET_PERMISSIONS, {}),
    );
    return result;
  }

  @Roles(Role.SuperAdmin)
  @Post()
  async createPermission(@Body() createPermissionDto: CreatePermissionDto) {
    const result = await lastValueFrom(
      this.userClient.send(
        PERMISSION_PATTERN_NAMES.CREATE_PERMISSION,
        createPermissionDto,
      ),
    );
    return result;
  }

  @Roles(Role.SuperAdmin)
  @Put(':id')
  async updatePermission(
    @Param('id') id: string,
    @Body() updatePermissionDto: CreatePermissionDto,
  ) {
    const result = await lastValueFrom(
      this.userClient.send(PERMISSION_PATTERN_NAMES.UPDATE_PERMISSION, {
        id,
        data: updatePermissionDto,
      }),
    );
    return result;
  }

  @Roles(Role.SuperAdmin)
  @Delete(':id')
  async deletePermission(@Param('id') id: string) {
    const result = await lastValueFrom(
      this.userClient.send(PERMISSION_PATTERN_NAMES.DELETE_PERMISSION, id),
    );
    return result;
  }
}
