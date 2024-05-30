import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoListSchema,TodoList } from './schema/todolist.schema';
import { TodoItemSchema,TodoItem } from './schema/todoitem.schema';
import { TodoListService,TodoItemService } from './service/index';
import { LoggerQueueConf } from 'src/config/bull.module.config';
import { TodoController } from './controller/todo.controller';
import {UserModule} from 'src/user/user.module';
@Module({
    imports:[MongooseModule.forFeature([{name:TodoList.name,schema:TodoListSchema},{name:TodoItem.name,schema:TodoItemSchema}]),LoggerQueueConf,UserModule],
    providers:[TodoItemService,TodoListService],
    controllers:[TodoController],
    exports:[MongooseModule]
})
export class TodoModule {}
