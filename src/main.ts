/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(compression());
  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
  });
  await app.listen(3000);
}
bootstrap();
