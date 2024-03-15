// import { Test, TestingModule } from '@nestjs/testing';
// import { UrlController } from '../Url/url.controller';
// import { UrlService } from '../Url/url.service';
// import { Url, UrlSchema } from '../Models/Url';
// import { UrlModule } from '../Url/url.module';
// import { MongooseModule } from '@nestjs/mongoose';
// import { after } from 'node:test';
// import mongoose from 'mongoose';

// describe('UrlController', () => {
//   let urlController: UrlController;
//   let urlService: UrlService;

//   beforeEach(async () => {
//     const uri =  MongooseModule.forRoot('mongodb://localhost/UrlStoreDB');
//     const app: TestingModule = await Test.createTestingModule({
//       imports: [UrlModule,uri,
//         MongooseModule.forFeature([
//           {
//             name: 'Url',
//             schema: UrlSchema,
//           },
//         ]),],
//     }).compile();

//     urlController = app.get<UrlController>(UrlController);

//     urlService = app.get<UrlService>(UrlService);
//   });

//   after( async() => {
//     await mongoose.connection.dropDatabase(); // Cleanup after each test
//     await mongoose.connection.close()
//  });

//   describe('root', () => {
//     it('should return "Hello World!"', () => {
//       expect(urlController.getHello()).toBe('Hello World!');
//     });
//   });
// });
