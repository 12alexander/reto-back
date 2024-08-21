import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({ type: Types.ObjectId, auto: true })
  user_id: Types.ObjectId;

  @Prop()
  task: string;

  @Prop({ default: true })
  status: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
