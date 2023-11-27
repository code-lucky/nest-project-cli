import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisService } from 'src/redis/redis.service';
import { md5 } from 'src/utils/md5';
import { UserLoginByEmailDto } from './dto/user-login-email.dto';
import { LoginUserVo } from './vo/login-user.vo';
import { userLoginByPasswordDto } from './dto/user-login-password.dto';
import { UserInfoVo } from './vo/user-info.vo';

@Injectable()
export class UserService {
  
  @InjectRepository(User)
  private userRepository: Repository<User>;

  @Inject(RedisService)
  private redisService: RedisService;

  async createUsr(user: RegisterUserDto){
    const captcha = await this.redisService.get(`captcha_register_${user.email}`)

    if(!captcha){
      throw new HttpException('验证码已失效', HttpStatus.BAD_REQUEST)
    }

    if(user.captcha !== captcha){
      throw new HttpException('验证码不正确', HttpStatus.BAD_REQUEST)
    }

    const getUser = await this.userRepository.findOneBy({username: user.username})
    if(getUser){
      throw new HttpException('用户已存在',HttpStatus.BAD_REQUEST)
    }

    const addUser = new User();
    addUser.username = user.username;
    addUser.password = md5(user.password)
    addUser.email = user.email;

    try{
      await this.userRepository.save(addUser);
      return '注册成功'
    }catch(e){
      return '注册失败';
    }
  }

  async userLoginByEmail(userLoginByEmail: UserLoginByEmailDto){

    const captcha = await this.redisService.get(`captcha_login_${userLoginByEmail.email}`)

    if(!captcha){
      throw new HttpException('验证码已失效', HttpStatus.BAD_REQUEST)
    }

    if(userLoginByEmail.captcha !== captcha){
      throw new HttpException('验证码不正确', HttpStatus.BAD_REQUEST)
    }
    const user = await this.userRepository.findOneBy({
      email: userLoginByEmail.email
    })
    const vo = new LoginUserVo();
    const {id, username, nickName, email, headPic, phoneNumber} = user
    vo.userInfo = {id, username, nickName, email, headPic, phoneNumber}
    return vo;
  }

  async userLoginByPassword(userLogin: userLoginByPasswordDto){
    const user = await this.userRepository.findOneBy({
      username: userLogin.username
    })

    if(!user){
      throw new HttpException('未找到该用户', HttpStatus.BAD_REQUEST)
    }

    if(user.password !== md5(userLogin.password)){
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST)
    }

    const vo = new LoginUserVo();
    const {id, username, nickName, email, headPic, phoneNumber} = user
    vo.userInfo = {id, username, nickName, email, headPic, phoneNumber}
    return vo
  }

  async getUserInfo(userId: number){
    const user = await this.userRepository.findOneBy({id:userId})
    if(!user)throw new HttpException('未找到该用户', HttpStatus.BAD_REQUEST)
    
    const vo = new UserInfoVo();
    
    const {id, username, nickName, email, headPic, phoneNumber} = user
    vo.id = id;
    vo.username = username;
    vo.nickName = nickName;
    vo.email = email;
    vo.headPic = headPic;
    vo.phoneNumber = phoneNumber
    return vo
  }
}
