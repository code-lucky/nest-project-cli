import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { md5 } from 'src/utils/md5';
import { LoginUserVo } from './vo/login-user.vo';
import { userLoginByPasswordDto } from './dto/user-login-password.dto';
import { UserInfoVo } from './vo/user-info.vo';
import { AdminUser } from '../entitys/admin_user.entity';
import { CreateUserDto } from './dto/create_user.dto';

@Injectable()
export class UserService {
  
  @InjectRepository(AdminUser)
  private userRepository: Repository<AdminUser>;

  async userLoginByPassword(userLogin: userLoginByPasswordDto){
    const user = await this.userRepository.findOneBy({
      userName: userLogin.userName,
      isDelete: 0
    })

    if(!user){
      throw new HttpException('未找到该用户', HttpStatus.BAD_REQUEST)
    }

    if(user.password !== md5(userLogin.password)){
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST)
    }

    const vo = new LoginUserVo();
    const {id, userName, headPic, phoneNumber,email} = user
    vo.userInfo = {id, userName, headPic, phoneNumber, email}
    return vo
  }

  async getUserInfo(userId: number){
    const user = await this.userRepository.findOneBy({id:userId})
    if(!user)throw new HttpException('未找到该用户', HttpStatus.BAD_REQUEST)
    
    const vo = new UserInfoVo();
    
    const {id, userName, email, headPic, phoneNumber} = user
    vo.id = id;
    vo.username = userName;
    vo.email = email;
    vo.headPic = headPic;
    vo.phoneNumber = phoneNumber
    return vo
  }

  async createUser(createUser: CreateUserDto){
    console.log(createUser)
    const user = await this.userRepository.findOneBy({
      userName: createUser.userName
    })
    if(user) throw new HttpException('已存在该用户',HttpStatus.BAD_REQUEST)
    try {
      const {userName, password, email, phoneNumber, headPic} = createUser
      const addUser = new AdminUser()
      addUser.userName = userName;
      addUser.password = md5(password);
      addUser.email = email;
      addUser.phoneNumber = phoneNumber;
      addUser.headPic = headPic
      this.userRepository.save(addUser)
      return '添加成功'
    } catch (error) {
      throw new HttpException(error.message,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
