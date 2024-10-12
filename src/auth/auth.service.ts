import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import {compare} from 'bcrypt';


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) {}

    async register(user: RegisterUserDto){

        const {email, phone} = user;

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

    //Login method
    async login(loginData: LoginAuthDto){

        const {email, password} = loginData;
        const userFound = await this.userRepository.findOneBy({email: email});

        if(!userFound){
            // throw new Error('Email not found');
            // error 404 not found
            return  new HttpException('Email not found', HttpStatus.NOT_FOUND);
        }

        const isPasswordValid = await compare(password, userFound.password);
        if(!isPasswordValid){
            // throw new Error('Invalid password');
            // error 403 forbidden
            return  new HttpException('Invalid password', HttpStatus.FORBIDDEN);
        }

        return userFound;
    }
}