import { Injectable } from '@nestjs/common';
import type { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService extends Redis{

    constructor(private configService: ConfigService){
        super({
            port: configService.get('redis_server_port'),
            host: configService.get('redis_server_host'),
            password: configService.get('redis_server_password'),
            lazyConnect: true
        })
    }
}
