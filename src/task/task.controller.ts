import { Controller, Post, Body, Get } from "@nestjs/common";
import {CreateTaskDto} from "./dto/create-task.dto";
import {TaskService} from "./task.service";

@Controller("task")
export class TaskController{
    constructor(private readonly taskService:TaskService){}

    @Post()
    async create(@Body() createTaskDto: CreateTaskDto){
        return await this.taskService.create(createTaskDto)
    }

    @Get()
    async findAll(){
        return this.taskService.findAll()
    }
}