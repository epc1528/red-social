import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { port } from './util/config/enviroment';
import middlewares from './util/config/middleware';
import { ValidationPipe } from '@nestjs/common';
import { LoggerService } from './config/logger/logger.service';
import { TimeoutInterceptor } from './config/interceptor/timeout';
import { ResponseInterceptor } from './config/interceptor/response';

async function bootstrap() {
  const logger = new LoggerService();
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalInterceptors(
    new ResponseInterceptor(),
    new TimeoutInterceptor(),
  );
  middlewares(app);
  app.useGlobalPipes(new ValidationPipe({
    stopAtFirstError:true,
  }));
  await app.listen(port);
}
bootstrap();