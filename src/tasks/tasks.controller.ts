import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTask } from './dto/create-task.dto';
import { UpdateTask } from './dto/update-task.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleBaseGuard } from 'src/guards/roleBase.guard';

@Controller('todos')
export class TodosController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createTodoDto: CreateTask) {
    return this.tasksService.create(createTodoDto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTask) {
    return this.tasksService.update(id, updateTodoDto);
  }
  @UseGuards(AuthGuard, new RoleBaseGuard(['admin']))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
