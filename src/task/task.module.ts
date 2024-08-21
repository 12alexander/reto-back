import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schemas/task.schema';
import { JWTGuardModule } from 'src/guards/jwt.guard.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    JWTGuardModule,
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
