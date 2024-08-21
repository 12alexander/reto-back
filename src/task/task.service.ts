import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { ByIdTaskDto } from './dto/byId.dto';
import { UpdateTaskDto } from './dto/update.dto';
import { CreateTaskI } from './interface/create.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  async create(createTaskDto: CreateTaskI): Promise<Task> {
    return await this.taskModel.create(createTaskDto);
  }

  async findAll({ _id }: ByIdTaskDto): Promise<Task[]> {
    return this.taskModel
      .find({
        user_id: _id,
      })
      .exec();
  }

  async update({ _id, task }: UpdateTaskDto) {
    return this.taskModel.findByIdAndUpdate(
      _id,
      { task },
      {
        new: true,
        runValidators: true,
      },
    );
  }

  async remove(_id: string) {
    return this.taskModel
      .findByIdAndUpdate(
        _id,
        { status: false },
        { new: true, runValidators: true },
      )
      .exec();
  }
}
