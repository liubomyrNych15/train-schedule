import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ResponseFormat } from '../interfaces/response-format.interface';

@Injectable()
export class ResponseInterceptor<T>
    implements NestInterceptor<T, ResponseFormat<T>>
{
    intercept(
        context: ExecutionContext,
        next: CallHandler<T>,
    ): Observable<ResponseFormat<T>> {
        return next.handle().pipe(
            map((data) => ({
                message: 'Success',
                statusCode: context.switchToHttp().getResponse().statusCode,
                timestamp: new Date().toISOString(),
                data,
            })),
        );
    }
}