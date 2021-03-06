import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * Entry point
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true });
  await app.listen(3000);
}
bootstrap();
