/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import * as bodyParser from 'body-parser'; // Use 'import * as' para importar corretamente

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configurar body-parser para aumentar o limite de tamanho das requisições
  app.use(bodyParser.json({ limit: '500mb' }));
  app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
  app.use(compression());
  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
  });
  await app.listen(3000);
}
bootstrap();
