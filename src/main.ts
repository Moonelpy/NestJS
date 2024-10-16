import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExRequestInterceptor } from './Books/interceptors/ex-request-interceptor.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Выключил Interceptor, т.к. он конфликтует с HttpExceptionFilter
  app.useGlobalInterceptors(new ExRequestInterceptor());
  await app.listen(3000);
}
bootstrap();
