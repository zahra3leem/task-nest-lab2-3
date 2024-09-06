import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Task } from 'src/tasks/entities/task.entity';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  age: number;

  @Prop({ unique: true })
  email: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] })
  tasks: Task[];

  @Prop()
  role: string;

  @Prop()
  password: string;

  @Prop()
  passwordConfirm: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
