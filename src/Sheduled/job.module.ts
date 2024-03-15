import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { UrlSchema } from 'src/Models/Url';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Url',
        schema: UrlSchema,
      },
    ]),
    ScheduleModule.forRoot()
  ],
  providers: [JobService],
  exports:[JobService]
})
export class JobModule {}
