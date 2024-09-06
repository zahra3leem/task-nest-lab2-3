import { HttpException, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/task-app'),
    AuthModule,
    TodosModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_FILTER, useClass: HttpException }],
})
export class AppModule {}

// providers: [,],
