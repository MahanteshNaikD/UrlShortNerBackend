import { Test, TestingModule } from '@nestjs/testing';
import { UrlController } from 'src/Url/url.controller';
import { UrlService } from 'src/Url/url.service';

describe('AppController', () => {
  let urlController: UrlController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UrlController],
      providers: [UrlService],
    }).compile();

    urlController = app.get<UrlController>(UrlController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(urlController.getHello()).toBe('Hello World!');
    });
  });
});
