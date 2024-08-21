import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create.dto';
import { TaskService } from './task.service';
import { JWTGuardService } from 'src/guards/jwt.guard.service';
import { UpdateTaskDto } from './dto/update.dto';
import { ByIdTaskDto } from './dto/byId.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(JWTGuardService)
  create(@Body() createTaskDto: CreateTaskDto, @Req() req: Request) {
    const user_id = req['user']._id;
    return this.taskService.create({ ...createTaskDto, user_id });
  }

  @Get()
  @UseGuards(JWTGuardService)
  findAll(@Req() req: Request) {
    const _id = req['user']?.['_id'];
    return this.taskService.findAll({ _id });
  }

  @Put()
  @UseGuards(JWTGuardService)
  update(@Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(updateTaskDto);
  }

  @Delete(':_id')
  @UseGuards(JWTGuardService)
  remove(@Param('_id') _id: string) {
    console.log(_id);
    return this.taskService.remove(_id);
  }
}
