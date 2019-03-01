import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';
import { LoggerService } from '../../logger/logger.service';
import { Logger } from '@nestjs/common'
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private loggerService: LoggerService) {}
  resolve(context: string): MiddlewareFunction {
    return (req, res, next) => {
      this.loggerService.info(`${req.method} ${req.originalUrl} ` + (Object.keys(req.body).length !== 0 ? JSON.stringify(req.body) : ''), context);
      next();
    };
  }
}
