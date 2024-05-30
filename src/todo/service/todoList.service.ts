import { Injectable } from "@nestjs/common";
import {MongoRepository} from 'src/share/repository/mongo.repository';
import { TodoList } from "../schema/todolist.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { UserService } from "src/user/service/user.service";
import {TodoItem} from '../schema/todoitem.schema'

@Injectable()
export class TodoListService extends MongoRepository<TodoList>  {
    constructor(
    @InjectModel(TodoList.name) private todoModel: Model<TodoList>,
    // @InjectModel(TodoItem.name) private todoItemModel: Model<TodoItem>,

    @InjectQueue('logger') private loggerQueue: Queue,
    private readonly  userservice:UserService
  ) { 
      super(todoModel)
    }
    async cerateTodoList(userId,todoList):Promise<TodoList>{
        try {
            // this.loggerQueue.add('error','jsdfhkjasd')
            const obj={
                userId:userId,
                ...todoList
                
            }
            const Itodolist =await this.save(obj);
             await  this.userservice.addTodoList(userId,Itodolist._id)
            return Itodolist


        } catch (error) {
        // this.loggerQueue.add('error',error)
        }
    }
    async getTodoList(obj):Promise<TodoList[]>{
        console.log(obj);
        
         return await this.findAllbyField(obj)
    }
    async updateTodoList(UserId,id,todoList):Promise<{affected:number}>{
        const obj={
            _id:id,
            userId:UserId
        }
        return this.update(obj,todoList)
    }
    async deleteTodoList(userId,id):Promise<{affected:number}>{ 
        const obj={
            _id:id,
            userId:userId
        }
        return this.delete(obj)
    }
    // async AddtodoItem(id,idItem){
    //     const todolist =await this.findOne('id',id);
    //     todolist.todoItems.push(idItem)
    //     return this.update(id,todolist)
      
    // }
    async addtodoItemTodoList(id,idItem){
      const result = await  this.push(id,'todoItems',idItem);
        return result
    }

    
}