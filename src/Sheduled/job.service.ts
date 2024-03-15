import { Cron, Interval } from '@nestjs/schedule';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url } from 'src/Models/Url';

@Injectable()
export class JobService {
  constructor(@InjectModel('Url') private urlService: Model<Url>) {}

//   @Cron('*/20 * * * * *')
  async autoDeleteLink() {
    console.log('cron job started');
    const findAll = await this.urlService.aggregate([
      {
        $match: {
          $expr: {
            $lt: ['$expirationTime', Math.floor(new Date().getTime())],
          },
        },
      },
    ]);
    await this.urlService.deleteMany({ _id: { $in: findAll.map(doc => doc._id) } })
    console.log('cron job ended');
  }
}
