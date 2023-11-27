import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AdminRole } from '../entitys/admin_role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService {

  @InjectRepository(AdminRole)
  private roleRepository: Repository<AdminRole>;

  async create(createRoleDto: CreateRoleDto) {
    const result = await this.roleRepository.save(createRoleDto)
    if(result){
      return '添加成功'
    }else{
      return '添加失败'
    }
  }

  findAll() {
    return `This action returns all role`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
