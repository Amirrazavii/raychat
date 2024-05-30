import { Injectable } from "@nestjs/common";
import {MongoRepository} from 'src/share/repository/mongo.repository';
import { TodoItem } from "../schema/todoitem.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { UserService } from "src/user/service/user.service";


@Injectable()
export  class TodoItemService extends MongoRepository<TodoItem>  {
    constructor(@InjectModel(TodoItem.name) private userModel: Model<TodoItem>
  ) {
      
      super(userModel)
    }
     async cerateTodoItems(UserId,idtodolist,todoItems):Promise<TodoItem[]>{
        const todoItemss = todoItems.map(item=>({
            userId:UserId,
            todoList:idtodolist,
            ...item
        }))
        return await this.saveMany(todoItemss)
    }
    async getTodoItem(UserId,id):Promise<TodoItem>{
        // return this.findOne('id',id,['todoList'])
        const obj={
            _id:id,
            userId:UserId,
        }
        return await this.findOne(obj)
    }
    async getTodoItems(UserId,todiIdList):Promise<TodoItem[]>{
        const obj ={
            userId:UserId,
            todoList:todiIdList
        }
        return await  this.findAllbyField('todoList',todiIdList)
    }
    async updateTodoItem(UserId,id,todoItem):Promise<{affected:number}>{
        const obj={
            _id:id,
            userId:UserId
        }
        return await  this.update(obj,todoItem)
    }
    async deleteTodoItem(UserId,id):Promise<{affected:number}>{ 
        const obj={
            _id:id,
            userId:UserId
        }
        return await this.delete(obj)
    }    
}
