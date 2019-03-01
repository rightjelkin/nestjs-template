import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { IHelmetConfiguration } from 'helmet';
import { AppController } from './app.controller';
import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ProfileModule } from './profile/profile.module';
import { TagModule } from './tag/tag.module';
import { HelmetMiddleware } from './common/middlewares/helmet.middleware'
import { CompressionMiddleware } from './common/middlewares/compression.middleware'
import { LoggerMiddleware } from './common/middlewares/logger.middleware'
import { LoggerModule } from './logger/logger.module'

const allRoutes = {
  method: RequestMethod.ALL,
  path: "*",
};

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ArticleModule,
    UserModule,
    ProfileModule,
    TagModule,
    LoggerModule
  ],
  controllers: [
    AppController
  ],
  providers: []
})
export class ApplicationModule implements NestModule {
  public static helmetOptions: IHelmetConfiguration = {
    hsts: {
      maxAge: 31536000,
      includeSubdomains: true,
    },
    noCache: true
  };

  constructor(private readonly connection: Connection) {}
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(LoggerMiddleware)
      .with('IncomingRequest')
      .forRoutes(allRoutes)
      .apply(HelmetMiddleware)
      .with(ApplicationModule.helmetOptions)
      .forRoutes(allRoutes)
      .apply(CompressionMiddleware)
      .forRoutes(allRoutes)
  }

}
