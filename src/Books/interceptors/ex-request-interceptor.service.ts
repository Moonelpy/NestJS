import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ExRequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return { status: 'Success', data };
      }),
      catchError((error) => {
        const response = context.switchToHttp().getResponse();
        const status = error.getStatus ? error.getStatus() : 500;

        response.status(status).json({
          status: 'Fail(ExRequestInterceptor)',
          message: error.message || 'Тут должен быть текст ошибки',
          error: error.response || null,
        });

        return throwError(
          () => new Error(error.message || 'Internal server error'),
        );
      }),
    );
  }
}
