import { Module } from '@nestjs/common';
import { LoggerQueue } from './processor.logger';

@Module({
    imports: [],
    controllers: [],
    providers: [LoggerQueue],
})
export class CachModule {}
