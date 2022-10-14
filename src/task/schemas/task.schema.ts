import {Schema,Prop,SchemaFactory} from "@nestjs/mongoose"
import {Document} from "mongoose"

export type TaskDocument = Task & Document;

@Schema()
export class Task{
    @Prop()
    user:string;
    
    @Prop()
    task:string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);