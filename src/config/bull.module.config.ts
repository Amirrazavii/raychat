import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const BullModuleConf = BullModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    redis: {
      host: configService.getOrThrow('hostredis'),
      port: configService.getOrThrow('portredis'),
    },
  }),
});

export const LoggerQueueConf = BullModule.registerQueue({
  name: 'logger',
});
