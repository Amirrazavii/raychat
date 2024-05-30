import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "../schema/user.schema";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from "../dto";
import {MongoRepository} from 'src/share/repository/mongo.repository'
import { JwtService } from "@nestjs/jwt";
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';


@Injectable()
export class UserService extends MongoRepository<User>{
    constructor(@InjectModel(User.name) private userModel: Model<User>,
    @InjectQueue('logger') private readonly loggerQueue: Queue,
    private jwtService: JwtService
  ) {
      super(userModel)
    }
    async create(user): Promise<any> {
      const obj={
        username:user.username
      }
      const userFound = await this.findOne(obj);
      if (userFound) {
        throw new UnauthorizedException();
      }
      const createUser = await this.save(user)
      const payload = { sub: createUser._id};
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }


    async login(user: CreateUserDto): Promise<any> {

      try {
        const userFound = await this.findOne(user);
        if (!userFound) {
          throw new UnauthorizedException();
        }
  
        // const isPasswordMatch = userFound.password === user.password;
        // if (!userFound || !isPasswordMatch) {
        //   throw new UnauthorizedException();
        // }
        const payload = { sub: userFound._id };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
        
      } catch (error) {
        throw error;
      }
    }
    async addTodoList(id,idItem){
      const result = await this.push(id,'todoList',idItem);
        return result
    }

  
    
}
