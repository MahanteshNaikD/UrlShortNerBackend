import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlSchema } from '../Models/Url';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Url',
        schema: UrlSchema,
      }
    ]),
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({isGlobal:true}),
  ],
  controllers: [UrlController],
  providers: [UrlService],
})
export class UrlModule {}
