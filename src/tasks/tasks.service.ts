import { Task } from './entities/task.entity';
import { CreateTask } from './dto/create-task.dto';
import { UpdateTask } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    @Inject(REQUEST) private readonly req: Request,
  ) {}

  async create(createTask: CreateTask) {
    const task = await this.taskModel.create({
      ...createTask,
      user: this.req['user']._id,
    });
    return task;
  }

  async findAll() {
    const todos = await this.taskModel.find();
    return todos;
  }

  async findOne(id: string) {
    const todo = await this.taskModel.findById(id);
    return todo;
  }

  async update(id: string, updateTask: UpdateTask) {
    const todo = await this.taskModel.findOneAndUpdate(
      { _id: id },
      updateTask,
      {
        new: true,
        runValidators: true,
      },
    );
    return todo;
  }

  async remove(id: string) {
    return await this.taskModel.findByIdAndDelete(id);
  }
}
