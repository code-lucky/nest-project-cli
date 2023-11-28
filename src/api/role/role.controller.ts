import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireLogin } from 'src/decorator/custom.decorator';
import { CreateAdminMenuDto } from './dto/create-admin-menu.dto';

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
}
