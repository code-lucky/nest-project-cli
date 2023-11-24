import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload_img')
  @UseInterceptors(FileInterceptor('aaa',{
    dest:'uploads'
  }))
  upload_test(@UploadedFile() file: Express.Multer.File, @Body() body){
    console.log('body', body);
    console.log('file', file);
  }
}
