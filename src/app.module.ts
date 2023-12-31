import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './api/user/user.module';
import { EmailModule } from './api/email/email.module';
import { WinstonModule } from './winston/winston.module';
import { format, transports } from 'winston';
import * as chalk from 'chalk';
import { Constant } from './utils/constant';
import { APP_GUARD } from '@nestjs/core';
import { LoginGuard } from './guard/login.guard';
import { RoleModule } from './api/role/role.module';
import { AdminRole } from './api/entitys/admin_role.entity';
import { AdminUser } from './api/entitys/admin_user.entity';
import { AdminMenu } from './api/entitys/admin_menu.entity';
import { AdminRoleMenu } from './api/entitys/admin_role_menu.entity';
import { MenuModule } from './api/menu/menu.module';

@Module({
  imports: [
    WinstonModule.forRoot({
      level: 'debug',
      transports: [
          new transports.Console({
              format: format.combine(
                  format.colorize(),
                  format.printf(({context, level, message, time}) => {
                      const appStr = chalk.green(`[NEST]`);
                      const contextStr = chalk.yellow(`[${context}]`);
  
                      return `${appStr} ${time} ${level} ${contextStr} ${message} `;
                  })
              ),

          }),
          new transports.File({
              format: format.combine(
                  format.timestamp(),
                  format.json()
              ),
              filename: `loggger-${Constant.CURRENT_DATE}-${Constant.TIMESTAMP}.log`,
              dirname: `log/${Constant.CURRENT_DATE}`,
              maxsize: 1024*1024
          })
        ]
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory(configService: ConfigService){
        return {
          secret: configService.get('jwt_secret'),
          signOptions: {
            expiresIn: '30m' // 默认30分钟
          }
        }
      },
      inject: [ConfigService]
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/.env'
    }),
    TypeOrmModule.forRootAsync({
      useFactory(configService:ConfigService) {
        return{
          type: "mysql",
          host: configService.get('mysql_server_host'),
          port: configService.get('mysql_server_port'),
          username: configService.get('mysql_server_username'),
          password: configService.get('mysql_server_password'),
          database: configService.get('mysql_server_database'),
          synchronize: true,
          logging: true,
          entities: [AdminRole, AdminUser, AdminMenu, AdminRoleMenu],
          poolSize: 10,
          connectorPackage: 'mysql2',
          extra: {
              authPlugin: 'sha256_password',
          }
        }
      },
      inject: [ConfigService]
    }),
    RedisModule,
    EmailModule,
    UserModule,
    RoleModule,
    MenuModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: LoginGuard
    }
  ],
})
export class AppModule {}
