import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop()
  name: string;

  @Prop()
  isImportant: boolean;

  @Prop()
  duration: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: mongoose.Schema.Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
