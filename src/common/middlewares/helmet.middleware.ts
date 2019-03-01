import { NestMiddleware, Injectable } from '@nestjs/common';
import * as helmet from 'helmet';

@Injectable()
export class HelmetMiddleware implements NestMiddleware {
  public resolve(
    options?: helmet.IHelmetConfiguration,
  ): (req: any, res: any, next: any) => void {
    return helmet(options);
  }
}