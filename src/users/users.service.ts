import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    findAll(){
        return this.usersRepository.find();
    }

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>
    ) {}

    create(user: CreateUserDto){
        const newUser = this.usersRepository.create(user);
        return this.usersRepository.save(newUser);
    }

    async update(id: number, user: UpdateUserDto){
        const userFound = await this.usersRepository.findOneBy({id: id});

        if(!userFound){
            // 404 Not Found
            return new HttpException('User does not exist', HttpStatus.NOT_FOUND);
        }

        const updatedUser = Object.assign(userFound, user);
        return this.usersRepository.save(updatedUser);
    }

}
