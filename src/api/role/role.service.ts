import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { AdminRole } from '../entitys/admin_role.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdminMenuDto } from './dto/create-admin-menu.dto';
import { AdminMenu } from '../entitys/admin_menu.entity';
import { AdminUser } from '../entitys/admin_user.entity';
import { RoleListVo } from './vo/role-list.vo';
import { AdminRoleMenu } from '../entitys/admin_role_menu.entity';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {

  @InjectRepository(AdminRole)
  private roleRepository: Repository<AdminRole>;

  @InjectRepository(AdminMenu)
  private menuRepository: Repository<AdminMenu>;

  @InjectRepository(AdminUser)
  private userRepository: Repository<AdminUser>;

  @InjectRepository(AdminRoleMenu)
  private roleMenuRepository: Repository<AdminRoleMenu>

  /**
   * 创建角色用户
   * @param createRoleDto 
   * @returns 
   */
  async createRoleUser(createRoleDto: CreateRoleDto) {

    const role = await this.roleRepository.findBy({
      roleName: createRoleDto.roleName
    })

    // 如果是已存在的角色则不能新增
    if (role) {
      throw new HttpException('角色昵称已存在', HttpStatus.BAD_REQUEST)
    }

    // 新增角色
    const result = await this.roleRepository.save(createRoleDto)

    // 新增完进行角色和权限关联
    createRoleDto.rules.forEach(async (res: any) => {
      const data = {
        id: result.id,
        rid: res
      }
      await this.roleMenuRepository.save(data)
    })

    if (result) {
      return '添加成功'
    } else {
      return '添加失败'
    }
  }

  /**
   * 菜单列表
   * @returns 
   */
  async menuList() {
    const menuList = await this.menuRepository.find()
    return menuList
  }

  /**
   * 创建菜单
   * @param adminMenu 
   * @returns 
   */
  async createMen(adminMenu: CreateAdminMenuDto) {
    const result = await this.menuRepository.save(adminMenu)
    if (result) {
      return '添加成功'
    } else {
      return '添加失败'
    }
  }

  async findRoleUserList(roleName: string) {
    let roleList = []
    const condition: Record<string, any> = {};

    if (roleName) {
      condition.roleName = Like(`%${roleName}%`);
    }

    roleList = await this.roleRepository.findBy({
      roleName: roleName
    })

    let resutlArr = []

    // 按用户去查询角色权限
    for (const item of roleList) {
      const dataList = await this.roleMenuRepository.
        createQueryBuilder('admin_role_menu').
        select('rid').
        where({ id: item.id }).
        getRawMany()

      const result = {
        id: item.id,
        roleName: item.roleName,
        level: item.level,
        status: item.status,
        createTime: item.createTime,
        updateTime: item.updateTime,
        rules: dataList.map(item => item.rid) || []
      }
      resutlArr.push(result)
    }

    const roleListVo = new RoleListVo()
    roleListVo.roleList = resutlArr
    return roleListVo.roleList
  }

  async updateRole(updateRoleDto: UpdateRoleDto) {
    const roleItem = await this.roleRepository.findOneBy({ id: updateRoleDto.id })

    if (!roleItem) {
      throw new HttpException('角色用户不存在', HttpStatus.BAD_REQUEST)
    }

    // 第一步删除权限，然后重新写入权限表
    await this.roleMenuRepository.
      createQueryBuilder('admin_role_menu').
      delete().
      where({ id: roleItem.id }).
      execute()

    // 重新写入权限
    updateRoleDto.rules.forEach(async (res: any) => {
      const data = {
        id: roleItem.id,
        rid: res
      }
      await this.roleMenuRepository.save(data)
    })

    // 更新role表数据
    const result = await this.roleRepository.
      createQueryBuilder().
      update().
      set({ roleName: updateRoleDto.roleName, status: updateRoleDto.isShow }).
      where({ id: roleItem.id }).
      execute()

    if(result){
      return '修改成功'
    }else{
      return '修改失败'
    }
  }
}
