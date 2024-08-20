import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop()
  user_id: string;

  @Prop()
  task: string;

  @Prop()
  status: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
