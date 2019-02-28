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
    TagModule
  ],
  controllers: [
    AppController
  ],
  providers: []
})
export class ApplicationModule implements NestModule {
  public static helmetOptions: IHelmetConfiguration | undefined = undefined;

  constructor(private readonly connection: Connection) {}
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(HelmetMiddleware)
      .with(ApplicationModule.helmetOptions)
      .forRoutes(allRoutes)
  }

}
