import { Body, Controller,Get,Post, UseGuards } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { CreateUserDto} from 'src/user/dto'
import { User} from "../schema/user.schema";
import { ApiTags } from "@nestjs/swagger";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
// import { ApiBearerAuth } from "@nestjs/swagger";
// import { JwtAuthGuard } from "src/share/guard/auth.guard";

// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
        @InjectQueue('logger') private userQueue: Queue,

    ) {}
    // @Get()
    // getHello(): string {
    //     return 'Hello World!';
    // }
    @Post('create')
    create(@Body() user:CreateUserDto): Promise<User> {
        try {
            
            return this.userService.create(user)
        } catch (error) {
            this.userQueue.add('error',error)
            
            
        }
    }
    @Post('login')
    login(@Body() user:CreateUserDto): Promise<User> {
        try {
            return this.userService.login(user)
        } catch (error) {
            this.userQueue.add('error',error)
            
        }
    }

}