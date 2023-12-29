import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRole } from '../entitys/admin_role.entity';
import { AdminMenu } from '../entitys/admin_menu.entity';
import { AdminUser } from '../entitys/admin_user.entity';
import { AdminRoleMenu } from '../entitys/admin_role_menu.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([AdminRole, AdminMenu, AdminUser,AdminRoleMenu])
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
