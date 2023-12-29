import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Query, DefaultValuePipe } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireLogin } from 'src/decorator/custom.decorator';
import { CreateAdminMenuDto } from './dto/create-admin-menu.dto';
import { RoleListVo } from './vo/role-list.vo';

@ApiTags('Role-Module')
@Controller('role')
@RequireLogin()
@ApiBearerAuth()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('addRoleUser')
  @ApiResponse({
    status: HttpStatus.OK,
    description: '添加成功',
    type: String
  })
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.roleService.createRoleUser(createRoleDto);
  }


  @Post('addMenu')
  @ApiResponse({
    status: HttpStatus.OK,
    description: '添加成功',
    type: String
  })
  async addMenu(@Body() createAdminMenu: CreateAdminMenuDto){
    return await this.roleService.createMen(createAdminMenu);
  }

  @Get('getMenuList')
  async getMenuList(){
    return await this.roleService.menuList()
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: '获取成功',
    type: RoleListVo
  })
  @Get('getRoleUserList')
  async getRoleUserList(@Query('roleName')roleName: string){
    return this.roleService.findRoleUserList(roleName);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: '更新成功',
  })
  @Post('updateRoleUser')
  async updateRole(@Body() updateRoleDto: UpdateRoleDto){
    return this.roleService.updateRole(updateRoleDto)
  }
}
