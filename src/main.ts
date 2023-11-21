import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FormatResponseInterceptor } from './interceptors/format-response.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局启用
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new FormatResponseInterceptor())

  await app.listen(3000);
}
bootstrap();
