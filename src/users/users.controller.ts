import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    // Get the data from the request body and return it
    // Post request to create a new user
    // Put the data in the request body into the user variable
    // Delete the user variable

    @UseGuards(JwtAuthGuard)
    @Get() // Route: http://localhost:3000/users
    findAll(){
        return this.userService.findAll();
    }

    @Post() // Route: http://localhost:3000/users
    create(@Body() user: CreateUserDto){
        return this.userService.create(user);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id') // Route: http://localhost:3000/users/:id
    update(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto){
        return this.userService.update(id, user);
    }


}
