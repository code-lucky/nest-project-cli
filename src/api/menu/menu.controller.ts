import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Query } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) { }

  @Get('getMenuList')
  @ApiResponse({
    description: '获取成功',
    status: HttpStatus.OK,
    type: String
  })
  async getMenuList() {
    return this.menuService.findMenuList()
  }

  @Get('getMenuTree')
  getMenuTree() {
    return this.menuService.getMenuTrees()
  }

  @Post('addMenu')
  @ApiResponse({
    description: '新增成功',
    status: HttpStatus.OK,
    type: String
  })
  async addMenu(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.createMenu(createMenuDto)
  }

  @Post('updateMenu')
  async updateMenu(@Body() updateMenu: UpdateMenuDto) {
    return this.menuService.updateMenuItem(updateMenu)
  }

  @Get('getMenuById')
  async getMenuItem(@Query('id') id: number) {
    return this.menuService.getMenuItemById(id)
  }

  @Get('getMenuByUserId')
  async getMenuItemByUserId(@Query('id') id: number){
    return this.menuService.getMenuByUserId(id)
  }
}
