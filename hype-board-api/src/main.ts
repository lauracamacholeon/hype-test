import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: ['GET'],
  });

  app.setGlobalPrefix('api');

  await app.listen(3000);
  console.log('hype-board-api running on http://localhost:3000');
}
void bootstrap();
