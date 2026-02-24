import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: ['GET'],
  });

  app.setGlobalPrefix('api');

  await app.listen(3000);
  console.log('hype-board-api running on http://localhost:3000');
}
void bootstrap();
