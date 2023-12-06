import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Repository } from 'typeorm';
import { AdminMenu } from '../entitys/admin_menu.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MenuService {
  
  @InjectRepository(AdminMenu)
  private menuRepository: Repository<AdminMenu>;

  async findMenuList(){
    const menuList = await this.menuRepository.findBy({
      isDelete: 0
    })

    return menuList;
  }

  async createMenu(createMenuDto:CreateMenuDto){
    try {
      const menu = new AdminMenu()
      const {pid, name, icon, perms, component, menuType, sort, isShow} = createMenuDto;
      menu.pid = pid;
      menu.name = name;
      menu.icon = icon;
      menu.perms = perms;
      menu.component = component;
      menu.menuType = menuType;
      menu.sort = sort;
      menu.isShow = isShow;
      
      this.menuRepository.save(createMenuDto)
      return '新增成功'
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
