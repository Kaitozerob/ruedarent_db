import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginAuthDto {

    @IsNotEmpty()
    @IsString()
    @IsEmail({}, {message: 'Invalid email'})
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}