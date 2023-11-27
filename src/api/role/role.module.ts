import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRole } from '../entitys/admin_role.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([AdminRole])
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
