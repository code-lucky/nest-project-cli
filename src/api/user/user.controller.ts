import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EmailService } from 'src/api/email/email.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(EmailService)
  private emailService: EmailService;

  @Post('register')
  @ApiResponse({
    status: HttpStatus.OK,
    description: '注册成功',
    type: String
  })
  async registerUser(@Body() registerUserDto:RegisterUserDto){

  }
}
