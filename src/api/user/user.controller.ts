import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, HttpStatus, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { EmailService } from 'src/api/email/email.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RedisService } from 'src/redis/redis.service';
import { RequireLogin } from 'src/decorator/custom.decorator';
import { UserLoginByEmailDto } from './dto/user-login-email.dto';
import { LoginUserVo } from './vo/login-user.vo';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { userLoginByPasswordDto } from './dto/user-login-password.dto';

@ApiTags('User-Module')
@Controller('user')
export class UserController {
  @Inject(UserService)
  private userService: UserService;

  @Inject(EmailService)
  private emailService: EmailService;
  
  @Inject(RedisService)
  private redisService: RedisService;

  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(ConfigService)
  private configService: ConfigService;
  
  @Post('register')
  @ApiResponse({
    status: HttpStatus.OK,
    description: '注册成功',
    type: String
  })
  async registerUser(@Body() registerUserDto:RegisterUserDto){
    return await this.userService.createUsr(registerUserDto)
  }

  @Get('registerCaptcha')
  @ApiResponse({
    status: HttpStatus.OK,
    description: '发送成功',
    type: String
  })
  async registerCaptcha(@Query('email') email: String){
    const code = Math.random().toString().slice(2,8)

    await this.redisService.set(`captcha_register_${email}`, code, 5*60)

    await this.emailService.sendMail({
      to: email,
      subject: '注册验证码',
      html: `<p>你的注册验证码是 ${code}</p>`
    })

    return '发送成功'
  }

  @Get('loginCaptcha')
  @ApiResponse({
    status: HttpStatus.OK,
    description: '发送成功',
    type: String
  })
  async userLoginCaptcha(@Query('email') email: String){
    const code = Math.random().toString().slice(2,8)

    await this.redisService.set(`captcha_login_${email}`, code, 5*60)

    await this.emailService.sendMail({
      to: email,
      subject: '登录验证码',
      html: `<p>你的登录验证码是 ${code}，有效时间5分钟</p>`
    })

    return '发送成功'
  }

  @Post('userEmailLogin')
  @ApiResponse({
    status: HttpStatus.OK,
    description: '用户信息和token',
    type: LoginUserVo
  })
  async userLoginByEmail(@Body()userLoginByEmail: UserLoginByEmailDto){
    const vo = await this.userService.userLoginByEmail(userLoginByEmail);

    vo.accessToken = this.jwtService.sign({
      userId: vo.userInfo.id,
      username: vo.userInfo.username
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

  @Post('userPasswordLogin')
  @ApiResponse({
    status: HttpStatus.OK,
    description: '用户信息和token',
    type: LoginUserVo
  })
  async userLoginByPassword(@Body()userLogin: userLoginByPasswordDto){
    const vo = await this.userService.userLoginByPassword(userLogin)

    vo.accessToken = this.jwtService.sign({
      userId: vo.userInfo.id,
      username: vo.userInfo.username
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
}
