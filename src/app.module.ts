import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlModule } from './Url/url.module';
import { AuthModule } from './Auth/auth.module';
import { JobModule } from './Sheduled/job.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/UrlStoreDB'),

    UrlModule,
    AuthModule,
    JobModule,
    ThrottlerModule.forRoot([
      {
        ttl: 6000,
        limit: 2,
      },
    ]),
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({isGlobal:true}),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR, 
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
