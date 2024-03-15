import { Test, TestingModule } from '@nestjs/testing';
import { UrlController } from '../Url/url.controller';
import { UrlService } from '../Url/url.service';
import { Url, UrlSchema } from '../Models/Url';
import { UrlModule } from '../Url/url.module';
import { MongooseModule } from '@nestjs/mongoose';
import { after } from 'node:test';
import mongoose from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('UrlController', () => {
  let urlController: UrlController;
  let urlService: UrlService;

  beforeAll(async () => {
    const uri =  MongooseModule.forRoot('mongodb://localhost/UrlStoreDB');
    const app: TestingModule = await Test.createTestingModule({
      imports: [UrlModule,uri,
        MongooseModule.forFeature([
          {
            name: 'Url',
            schema: UrlSchema,
          },
        ]),],
    }).compile();

    urlController = app.get<UrlController>(UrlController);

    urlService = app.get<UrlService>(UrlService);
  });

  afterAll( async() => {
    await mongoose.connection.dropDatabase(); 
    await mongoose.connection.close()
 },10000);

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(urlController.getHello()).toBe('Hello World!');
    });
  });
});
