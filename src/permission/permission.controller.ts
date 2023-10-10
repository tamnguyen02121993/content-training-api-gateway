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
  PERMISSION_PATTERN_NAMES,
  Permission,
  Permissions,
  TableParamsDto,
} from '../common';
import { CreatePermissionDto } from './dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionController {
  constructor(
    @Inject(MODULE_NAMES.USER_CLIENT_MICROSERVICE)
    private readonly userClient: ClientKafka,
  ) {}

  @Permissions(Permission.ViewPermissionById)
  @Get(':id')
  async getPermissionById(@Param('id') id: string) {
    const result = await lastValueFrom(
      this.userClient.send(PERMISSION_PATTERN_NAMES.GET_PERMISSION_BY_ID, id),
    );
    return result;
  }

  @Permissions(Permission.ViewPermission)
  @Get()
  async getPermissions(
    @Query() tableParamsDto: TableParamsDto,
    @Query('currentPage', ParseIntPipe) currentPage: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
  ) {
    const result = await lastValueFrom(
      this.userClient.send(PERMISSION_PATTERN_NAMES.GET_PERMISSIONS, {
        ...tableParamsDto,
        currentPage,
        pageSize,
      }),
    );
    return result;
  }

  @Permissions(Permission.CreatePermission)
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

  @Permissions(Permission.UpdatePermission)
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

  @Permissions(Permission.DeletePermission)
  @Delete(':id')
  async deletePermission(@Param('id') id: string) {
    const result = await lastValueFrom(
      this.userClient.send(PERMISSION_PATTERN_NAMES.DELETE_PERMISSION, id),
    );
    return result;
  }
}
