import { Module } from '@nestjs/common';
import { UserSchema,User } from './schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoggerQueueConf } from 'src/config/bull.module.config';
import { JwtAuthGuard } from 'src/share/guard/auth.guard';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
        useFactory: (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
          },
        }),
        
        inject: [ConfigService],
      }),LoggerQueueConf],
    controllers:[UserController],
    providers:[UserService,MongooseModule,JwtAuthGuard],
    exports:[MongooseModule,JwtModule,UserService]
})
export class UserModule {}
