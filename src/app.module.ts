import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CachModule } from './cach/cach.module';
import  mongodbConfig from 'src/config/mongodb.config';
import { BullModule } from '@nestjs/bull';
import { BullModuleConf } from './config/bull.module.config';
// import { JwtAuthGuard } from './share/guard/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load:[mongodbConfig]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        configService.get('DATABASE'),
      inject: [ConfigService],
    }), UserModule, TodoModule, CachModule,BullModuleConf],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
