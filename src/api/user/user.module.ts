import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUser } from '../entitys/admin_user.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([AdminUser])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
