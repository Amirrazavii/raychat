import {BaseEntity} from 'src/share/entity/BaseEntity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { TodoList } from './todolist.schema';


@Schema()
export class TodoItem extends BaseEntity {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Prop({ required: true })
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Prop()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Prop()
  priority: number;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, ref: 'TodoList' })
  todoList: TodoList;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  userId: string;
}

export const TodoItemSchema = SchemaFactory.createForClass(TodoItem);