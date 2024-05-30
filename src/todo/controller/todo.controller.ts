import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import {UpdateTodoListDto,CreateTodoListDto,IdTodoListDto,IdTodoItemDto, UserDto,CreatedTodoItemDto} from '../dto'
import {TodoListService,TodoItemService} from '../service/index'

import { Body, Controller, Delete, Get, Patch, Post, Put, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/share/guard/auth.guard'
import {UserId} from 'src/share/decorator/get-user-id-from-req.decorator'
import { Queue } from 'bull'
import { InjectQueue } from '@nestjs/bull'

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('todo')
@Controller('todo')
export class TodoController{
    constructor(
        private todoService:TodoListService,
        private readonly TodoItemService :TodoItemService,
        @InjectQueue('logger') private userQueue: Queue,
    ){}
    @Post('create')
    async createTodoList(@UserId() UserId, @Body()todoList:CreateTodoListDto){
        try {
            return this.todoService.cerateTodoList(UserId,todoList)
            
        } catch (error) {
            this.userQueue.add('error',error)
            
        }
    }
    @Get('get')
    async getTodoList(@UserId() UserId){
        try {
            console.log(UserId);
            
            const obj={
                userId:UserId
            }
            return await  this.todoService.getTodoList(obj)
            
        } catch (error) {
            this.userQueue.add('error',error)
            
        }
    }
    @Put('update')
    async updateTodoList(@UserId() UserId,@Query()idTodoList:IdTodoListDto, @Body()todoList:UpdateTodoListDto){
        try {
            
            return this.todoService.updateTodoList(UserId,idTodoList.id,todoList)
        } catch (error) {
            this.userQueue.add('error',error)
            
        }
    }
    @Delete('delete')
    async deleteTodoList(@UserId() UserId,@Query()idTodoList:IdTodoListDto){
        try {
            
            return this.todoService.deleteTodoList(UserId,idTodoList.id)
        } catch (error) {
            this.userQueue.add('error',error)
            
        }
    }
    //item
    @Post('additem')
    async addTodoItem(@UserId() UserId,@Query()idTodoList:IdTodoListDto,@Body()createdTodoItemDto :CreatedTodoItemDto[]){
        try {
            const createdTodoItem = await  this.TodoItemService.cerateTodoItems(UserId,idTodoList.id,createdTodoItemDto)
            const arr=createdTodoItem.map(item=>item._id)
            return this.todoService.addtodoItemTodoList(idTodoList.id,arr)
            
        } catch (error) {
            this.userQueue.add('error',error)
            
        }
    }
    @Get('getitem')
    async getTodoItem(@UserId() UserId,@Query()IdTodoItem:IdTodoItemDto){
        try {
            
            return this.TodoItemService.getTodoItem(UserId,IdTodoItem.id)
        } catch (error) {
            this.userQueue.add('error',error)
        }
    }
    @Get('getitems')
    async getTodoItems(@UserId() UserId,@Query()IdTodoItem:IdTodoItemDto){
        try {
            
            return this.TodoItemService.getTodoItems(UserId,IdTodoItem.id)
        } catch (error) {
            this.userQueue.add('error',error)
            
        }
    }
    @Put('updateitem')
    async updateTodoItem(@UserId() UserId,@Query()IdTodoItem:IdTodoItemDto,@Body()todoItem:CreatedTodoItemDto){
        try {
            
            return this.TodoItemService.updateTodoItem(UserId,IdTodoItem.id,todoItem)
        } catch (error) {
            this.userQueue.add('error',error)
            
        }
    }
    @Delete('deleteitem')
    async deleteTodoItem(@UserId() UserId,@Query()IdTodoItem:IdTodoItemDto){
        try {
            
            return this.TodoItemService.deleteTodoItem(UserId,IdTodoItem.id)
        } catch (error) {
            this.userQueue.add('error',error)
            
        }
    }
       
}