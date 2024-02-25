import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { ResponseFormat } from 'src/lib/dto/responses/format';
  
  @Injectable()
  export class ResponseInterceptor<T>
    implements NestInterceptor<T, ResponseFormat<T>>
  {
    intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<ResponseFormat<T>> {
      const httpContext = context.switchToHttp();
      const response = httpContext.getResponse();
  
      return next.handle().pipe(
        map((message) => ({
          message: message.message,
          code: message.code,
          body: message.body
        })),
      );
    };
};