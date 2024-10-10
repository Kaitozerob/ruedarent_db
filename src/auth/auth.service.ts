import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) {}

    async register(user: RegisterUserDto){

        const emailExists = await this.userRepository.findOneBy({email: user.email});

        if(emailExists){
            // throw new Error('Email already exists');
            // error 409 conflict
            return  new HttpException('Email already exists', HttpStatus.CONFLICT);

        }
        
        const phoneExists = await this.userRepository.findOneBy({phone: user.phone});

        if(phoneExists){
            // throw new Error('Phone already exists');
            // error 409 conflict
            return  new HttpException('Phone already exists', HttpStatus.CONFLICT);
        }


        const newUser = this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }

}
