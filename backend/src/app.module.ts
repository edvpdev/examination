import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExamModule } from './modules/exam/exam.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { ScorecardModule } from './modules/scorecard/scorecard.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GetUserMiddleware } from './middlewares/get-user.middleware';
import { CategoryController } from './modules/category/category.controller';
import { QuestionsController } from './modules/questions/questions.controller';
import { ScorecardController } from './modules/scorecard/scorecard.controller';
import { ExamController } from './modules/exam/exam.controller';
import { ServeStaticModule } from '@nestjs/serve-static'; // <- INSERT LINE
import { join } from 'path'; // <- INSERT LINE

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    QuestionsModule,
    ExamModule,
    CategoryModule,
    ScorecardModule,
    MongooseModule.forRoot(`${process.env.MONGO_URI}`),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend'),
      exclude: ['/api*']
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(GetUserMiddleware)
      .forRoutes(
        CategoryController,
        QuestionsController,
        ScorecardController,
        ExamController,
      );
  }
}
