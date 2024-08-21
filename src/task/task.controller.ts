import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { CreateTaskDto } from './dto/create.dto';
import { TaskService } from './task.service';
import { JWTGuardService } from 'src/guards/jwt.guard.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(JWTGuardService)
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  @UseGuards(JWTGuardService)
  findAll(@Req() req: Request) {
    const _id = req['user']?.['_id'];
    return this.taskService.findAll({ _id });
  }
}
