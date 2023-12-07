import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { Repository } from 'typeorm';
import { AdminMenu } from '../entitys/admin_menu.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenuService {

  @InjectRepository(AdminMenu)
  private menuRepository: Repository<AdminMenu>;

  async findMenuList() {
    const menuList = await this.menuRepository.findBy({
      isDelete: 0
    })

    return menuList;
  }

  async createMenu(createMenuDto: CreateMenuDto) {
    try {
      const menu = new AdminMenu()
      const { pid, name, icon, perms, component, menuType, sort, isShow } = createMenuDto;
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

  async updateMenuItem(updateMenu: UpdateMenuDto) {
    const adminMenu = new AdminMenu();
    adminMenu.id = updateMenu.id;
    adminMenu.pid = updateMenu.pid;
    adminMenu.name = updateMenu.name;
    adminMenu.icon = updateMenu.icon;
    adminMenu.perms = updateMenu.perms;
    adminMenu.component = updateMenu.component;
    adminMenu.menuType = updateMenu.menuType;
    adminMenu.sort = updateMenu.sort;
    adminMenu.isShow = updateMenu.isShow;

    try {
      this.menuRepository.createQueryBuilder().
        update(AdminMenu).
        set(adminMenu).
        where(`id = :id`, { id: adminMenu.id }).
        execute()

      return '更新成功'
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getMenuItemById(id: number) {
    if (!id) {
      throw new HttpException('请传入id', HttpStatus.BAD_REQUEST)
    }
    const result = await this.menuRepository.findBy({
      id: id
    })
    return result;
  }

  async getMenuTrees() {
    const menuList = await this.menuRepository.findBy({
      isDelete: 0
    })
    return this.toTree(menuList, 0)
  }

  toTree(treeList, pid) {
    const arr = []
    treeList.forEach(item => {
      if (item.pid === pid) {
        const children = this.toTree(treeList, item.id)
        if (children.length > 0) {
          item.children = children
        }
        item['label'] = item.name
        item['value'] = item.id
        arr.push(item)
      }
    })
    console.log('arr===>', arr)
    return arr;
  }
}
