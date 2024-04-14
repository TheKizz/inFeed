import {
  type CallHandler,
  type ExecutionContext,
  Injectable,
  Logger,
  type NestInterceptor,
  type Request,
} from "@nestjs/common";
import { type Observable, tap } from "rxjs";

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const logger: Logger = new Logger(context.getClass().name, {
      timestamp: true,
    });
    const { method, url } = context.switchToHttp().getRequest<Request>();
    const controllerMethodName: string = context.getHandler().name;
    const logBody: Record<string, string> = {
      url,
      traceId: crypto.randomUUID(),
    };
    logger.log(
      `START ${method}(${controllerMethodName}) - ${JSON.stringify(logBody)}`,
    );
    return next.handle().pipe(
      tap({
        complete: () => {
          logger.log(
            `END ${method}(${controllerMethodName}) - ${JSON.stringify(logBody)}`,
          );
        },
      }),
    );
  }
}
