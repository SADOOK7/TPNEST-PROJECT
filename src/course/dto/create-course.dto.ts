import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCourseDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    duration: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    body: string;
}
