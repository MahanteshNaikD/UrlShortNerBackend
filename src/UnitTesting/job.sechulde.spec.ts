import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UrlSchema } from '../Models/Url';
import { JobModule } from '../Sheduled/job.module';
import { JobService } from '../Sheduled/job.service';
import mongoose from 'mongoose';

describe('Job Shedule', () => {
  let job: JobService;
  beforeAll(async () => {
    const uri = MongooseModule.forRoot('mongodb://localhost/UrlStoreDB');
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        JobModule,
        uri,
        MongooseModule.forFeature([
          {
            name: 'Url',
            schema: UrlSchema,
          },
        ]),
      ],
    }).compile();

    job = app.get<JobService>(JobService);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }, 10000);

  describe('Job Service', () => {
    it('should  go to job Service', async () => {
      const result = await job.autoDeleteLink();
      expect(result).toEqual(undefined);
    });
  });
});
