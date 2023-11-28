import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { AdminRole } from '../entitys/admin_role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdminMenuDto } from './dto/create-admin-menu.dto';
import { AdminMenu } from '../entitys/admin_menu.entity';
import { AdminUser } from '../entitys/admin_user.entity';

@Injectable()
export class RoleService {

  @InjectRepository(AdminRole)
  private roleRepository: Repository<AdminRole>;

  @InjectRepository(AdminMenu)
  private menuRepository: Repository<AdminMenu>;

  @InjectRepository(AdminUser)
  private userRepository: Repository<AdminUser>;

  /**
   * 创建角色用户
   * @param createRoleDto 
   * @returns 
   */
  async createRoleUser(createRoleDto: CreateRoleDto) {
    const result = await this.roleRepository.save(createRoleDto)
    if(result){
      return '添加成功'
    }else{
      return '添加失败'
    }
  }

  /**
   * 菜单列表
   * @returns 
   */
  async menuList(){
    const menuList = await this.menuRepository.find()
    return menuList
  }

  /**
   * 创建菜单
   * @param adminMenu 
   * @returns 
   */
  async createMen(adminMenu: CreateAdminMenuDto){
    const result = await this.menuRepository.save(adminMenu)
    if(result){
      return '添加成功'
    }else{
      return '添加失败'
    }
  }
}
