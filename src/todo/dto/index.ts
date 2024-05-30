import {TodoList} from 'src/todo/schema/todolist.schema';
import { TodoItem } from '../schema/todoitem.schema';
import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsString,ValidateNested  } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTodoListDto extends PickType(TodoList, ['title']) {}


export class CreateTodoListDto extends PickType(TodoList, ['title']) {}

export class CreatedTodoItemDto extends PickType(TodoItem, ['title','description','priority']) {}

export class UpdateTodoItemDto extends PickType(TodoItem, ['title','description','priority']) {}


export class IdTodoListDto {
    @ApiProperty({
        example:'60e6d8a4f8e1c0d5e4f8a3c3',
        type:String
    }
    )
    @IsString()
    id:string
}
export class IdTodoItemDto {
    @ApiProperty()
    @IsString()
    id:string
}
export class UserDto {
    @ApiProperty()
    @IsString()
    id:string
}

