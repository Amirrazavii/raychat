import {BaseEntity} from 'src/share/entity/BaseEntity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import {TodoList} from 'src/todo/schema/todolist.schema'


// export type UserDocument = User & Document;

@Schema({
    toJSON:{
        transform: function(doc,ret){
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            delete ret.createdAt;
            delete ret.updatedAt;
            delete ret.createdAtFa;
            return ret;
        
        }
    }
})
export class User extends BaseEntity {
  @Prop()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({
  })
  username: string;


  @Prop()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({
    

  })
  password: string;


  @Prop({
    ref:"TodoList",
    type: [SchemaTypes.ObjectId],
  })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({

  })
  todoList:TodoList[]

}

export const UserSchema = SchemaFactory.createForClass(User);
