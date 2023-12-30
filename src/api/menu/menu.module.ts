import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminMenu } from '../entitys/admin_menu.entity';
import { AdminUser } from '../entitys/admin_user.entity';
import { AdminRoleMenu } from '../entitys/admin_role_menu.entity';

@Module({
  imports:[TypeOrmModule.forFeature([AdminMenu, AdminUser, AdminRoleMenu]),],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
