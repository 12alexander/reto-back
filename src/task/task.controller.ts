import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateTaskDto } from './dto/create.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }
}
