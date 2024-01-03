import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, HttpStatus, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { EmailService } from 'src/api/email/email.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RedisService } from 'src/redis/redis.service';
import { RequireLogin } from 'src/decorator/custom.decorator';
import { LoginUserVo } from './vo/login-user.vo';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { userLoginByPasswordDto } from './dto/user-login-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserListVo } from './vo/user-list.vo';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('User-Module')
@Controller('user')
export class UserController {
  @Inject(UserService)
  private userService: UserService;

  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(ConfigService)
  private configService: ConfigService;
  

  @Post('userLogin')
  @ApiResponse({
    status: HttpStatus.OK,
    description: '用户信息和token',
    type: LoginUserVo
  })
  async userLoginByPassword(@Body()userLogin: userLoginByPasswordDto){
    const vo = await this.userService.userLoginByPassword(userLogin)

    vo.accessToken = this.jwtService.sign({
      userId: vo.userInfo.id,
      username: vo.userInfo.userName
    },{
      expiresIn: this.configService.get('jwt_access_token_expires_time') || '30m'
    })

    vo.refreshToken = this.jwtService.sign({
      userId: vo.userInfo.id
    }, {
      expiresIn: this.configService.get('jwt_refresh_token_expres_time') || '7d'
    });

    return vo;
  }

  @Post('createUser')
  @ApiResponse({
    status: HttpStatus.OK,
    description: '添加成功',
    type: CreateUserDto
  })
  @RequireLogin()
  @ApiBearerAuth()
  createUser(@Body()createUserDto: CreateUserDto){
    return this.userService.createUser(createUserDto)
  }

  @Get('getUserInfo')
  @ApiResponse({
    status: HttpStatus.OK,
    description: '获取用户信息',
    type: LoginUserVo
  })
  @RequireLogin()
  @ApiBearerAuth()
  async getUserInfo(@Query('userId')userId: number){
    return await this.userService.getUserInfo(userId)
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: '获取用户信息',
    type: UserListVo
  })
  @Get('getUserList')
  @RequireLogin()
  @ApiBearerAuth()
  async getUserList(@Query('userName') userName: string){
    return await this.userService.getUserList(userName)
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: '更新成功',
    type: String
  })
  @Post('updateUser')
  @RequireLogin()
  @ApiBearerAuth()
  async updateUser(@Body()user: UpdateUserDto){
    return await this.userService.updateUser(user)
  }
}
