import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';

/**
 * 响应拦截器
 */
@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(map((data) => {
      return {
        code: response.statusCode == 200 || response.statusCode == 201 ? 200: response.statusCode,
        message: 'success',
        data
      }
    }));
  }
}

