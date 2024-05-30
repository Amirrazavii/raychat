import {BaseEntity} from 'src/share/entity/BaseEntity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { HydratedDocument, SchemaTypes, mongo } from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { TodoItem } from './todoitem.schema';

@Schema()
export class TodoList extends BaseEntity{
    @Prop({
        ref:'User',
        type:SchemaTypes.ObjectId
    })
    // @IsString()
    @IsNotEmpty()
    @IsDefined()
    @ApiProperty({})
    userId:User

    @Prop({
        type:String
    })
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    @ApiProperty({})

    title:string
    @Prop({
        type:[SchemaTypes.ObjectId],
        default:[]

    })
    // @IsOptional()
    @ApiProperty({type:TodoItem})
    todoItems:TodoItem[]
}

export const TodoListSchema = SchemaFactory.createForClass(TodoList);

