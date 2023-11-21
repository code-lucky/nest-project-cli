import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ConfigService } from '@nestjs/config';
@Global()
@Module({
  providers: [
    RedisService,
    {
      provide:'REDIS_CLIENT',
      async useFactory(configService:ConfigService){
        return{
          host: configService.get('redis_server_host'),
          port: configService.get('redis_server_port'),
          database: configService.get('redis_server_db'),
        }
      },
      inject: [ConfigService]
    }
  ]
})
export class RedisModule {}
