import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TodosController } from './tasks.controller';
import { Task, TaskSchema } from './entities/task.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  controllers: [TodosController],
  providers: [TasksService, JwtService],
})
export class TodosModule {}
