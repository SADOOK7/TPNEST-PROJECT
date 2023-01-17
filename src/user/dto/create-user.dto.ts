import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    @IsNotEmpty()
    firstname: string;

    @IsString()
    @IsNotEmpty()
    lastname: string;
}
