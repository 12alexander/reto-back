import { Injectable } from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {CreateTaskDto} from "./dto/create-task.dto";
import { Task,TaskDocument } from "./schemas/task.schema";


@Injectable()
export class TaskService {
    constructor(
        @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
    ){}

    async create(createTaskDto:CreateTaskDto): Promise<Task>{
        return this.taskModel.create(createTaskDto);
    }

    async findAll(): Promise<Task[]>{
        return this.taskModel.find().exec();
    }

}