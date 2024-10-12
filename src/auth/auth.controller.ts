import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('register') // Route: http://localhost:3000/auth/register
    register(@Body() user: RegisterUserDto){
        return this.authService.register(user);
    }

    @Post('login') // Route: http://localhost:3000/auth/login
    login(@Body() loginData: LoginAuthDto){
        return this.authService.login(loginData);
    }
}
