import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create.dto';
import { TaskService } from './task.service';
import { ByIdTaskDto } from './dto/byId.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    const _id = 'req?.user?.id';
    return this.taskService.findAll(_id);
  }
}
