import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { UserDto } from './user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService, private readonly logger: Logger) {
        
    }

    @Get()
    findAll(): User[] {
        this.logger.log('Getting all users');
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): User {
        this.logger.log(`Getting user with id ${id}`);
        return this.userService.findOne(+id); 
    }

    @Post()
    create(@Body() userDto: UserDto): User {
        this.logger.log('Creating user');
        const user = this.userService.create(userDto);
        return user;
    }
}
