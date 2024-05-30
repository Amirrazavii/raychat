import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('logger')
export class LoggerQueue {

    @Process('error')
    async log(job: Job) {
        console.log(job);
        console.log(job.data);
    }
}