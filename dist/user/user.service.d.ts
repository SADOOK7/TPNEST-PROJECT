import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
export declare class UserService {
    private userRepository;
    private config;
    private jwt;
    constructor(userRepository: Repository<User>, config: ConfigService, jwt: JwtService);
    signToken(userId: number, email: string): Promise<string>;
    createUser(createUserDto: CreateUserDto): Promise<CreateUserDto & User>;
    findAllUsers(): Promise<User[]>;
    findUserByEmail(loginDto: LoginDto): Promise<User>;
    findUserById(userId: number): Promise<User>;
    updateUser(userId: any, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    deleteUser(userId: number, loginDto: LoginDto): Promise<string>;
}
