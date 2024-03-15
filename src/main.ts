import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as useragent from 'express-useragent';
import helmet from 'helmet';
async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.use(useragent.express());
  app.use(helmet())
  app.enableCors()
  await app.listen(3001);
}
bootstrap();
