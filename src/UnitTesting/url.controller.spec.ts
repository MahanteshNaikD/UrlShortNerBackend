import { Test, TestingModule } from '@nestjs/testing';
import { UrlController } from '../Url/url.controller';
import { UrlService } from '../Url/url.service';
import { UrlSchema } from '../Models/Url';
import { UrlModule } from '../Url/url.module';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { AuthModule } from '../Auth/auth.module';
import { UrlDto } from '../Dtos/userDto';
import { AuthController } from '../Auth/auth.controller';

describe('UrlController', () => {
  let urlController: UrlController;
  let urlService: UrlService;
  let authController: AuthController;

  let token;
  let urlCode;

  beforeAll(async () => {
    const uri = MongooseModule.forRoot('mongodb://localhost/UrlStoreDB');
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        UrlModule,
        uri,
        AuthModule,
        MongooseModule.forFeature([
          {
            name: 'Url',
            schema: UrlSchema,
          },
        ]),
      ],
    }).compile();

    urlController = app.get<UrlController>(UrlController);

    urlService = app.get<UrlService>(UrlService);

    authController = app.get<AuthController>(AuthController);

    token = await authController.signIn({
      userName: 'Mahantesh',
      password: '12345',
    });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }, 10000);

  describe('UserController', () => {
    it('should return "Hello check!"', () => {
      expect(urlController.getHello()).toBe('Hello check!');
    });
  });

  describe('UserController', () => {
    it('should return Url Creation', async () => {
      const newUserData = {
        originalUrl: '',
        shortUrl: '',
        urlCode: 'https://dev.to/enter?state=new-user',
        userId: '',
        clicks: 0,
        createdAt: undefined,
        expirationTime: undefined,
        clicksByReferrer: [],
        clicksByTime: [],
      };
      let token1 = {
        authorization: `Bearer ${token.access_token}`,
      };
      const result = await urlController.generateShortUrl(newUserData, token1);

      urlCode = result.urlCode;
      expect(result.statusCode).toEqual(201);
    });


    it('should return analytics', async () => {
      const newUserData = {
        originalUrl: '',
        shortUrl: '',
        urlCode: `${urlCode}`,
        userId: '',
        clicks: 0,
        createdAt: undefined,
        expirationTime: undefined,
        clicksByReferrer: [],
        clicksByTime: [],
      };
      let token1 = {
        authorization: `Bearer ${token.access_token}`,
      };
      const result = await urlController.analytices(newUserData, token1);

      expect(result).toEqual([]);
    });


    it('should return resources', async () => {
      const newUserData = {
        originalUrl: '',
        shortUrl: '',
        urlCode: `${urlCode}`,
        userId: '',
        clicks: 0,
        createdAt: undefined,
        expirationTime: undefined,
        clicksByReferrer: [],
        clicksByTime: [],
      };
      let token1 = {
        authorization: `Bearer ${token.access_token}`,
      };
      const result = await urlController.getSources(newUserData, token1);

      expect(result).toEqual([]);
    }); 
  });



  describe('UserService',()=>{
    it('should return Url Creation', async () => {
      const newUserData = {
        originalUrl: '',
        shortUrl: '',
        urlCode: 'https://dev.to/enter?state=new-user',
        userId: '',
        clicks: 0,
        createdAt: undefined,
        expirationTime: undefined,
        clicksByReferrer: [],
        clicksByTime: [],
      };
      let token1 = {
        authorization: `Bearer ${token.access_token}`,
      };
      const result = await urlService.generateShortUrl(newUserData, token1);

      urlCode = result.urlCode;
      expect(result.statusCode).toEqual(201);
    });


    it('should return analytics', async () => {
      const newUserData = {
        originalUrl: '',
        shortUrl: '',
        urlCode: `${urlCode}`,
        userId: '',
        clicks: 0,
        createdAt: undefined,
        expirationTime: undefined,
        clicksByReferrer: [],
        clicksByTime: [],
      };
      let token1 = {
        authorization: `Bearer ${token.access_token}`,
      };
      const result = await urlService.analytices(newUserData, token1);

      expect(result).toEqual([]);
    });


    it('should return resources', async () => {
      const newUserData = {
        originalUrl: '',
        shortUrl: '',
        urlCode: `${urlCode}`,
        userId: '',
        clicks: 0,
        createdAt: undefined,
        expirationTime: undefined,
        clicksByReferrer: [],
        clicksByTime: [],
      };
      let token1 = {
        authorization: `Bearer ${token.access_token}`,
      };
      const result = await urlService.getSources(newUserData, token1);

      expect(result).toEqual([]);
    }); 
  })

  
});
