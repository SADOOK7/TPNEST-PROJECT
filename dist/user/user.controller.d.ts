import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<CreateUserDto & import("./entities/user.entity").User>;
    findAll(): Promise<import("./entities/user.entity").User[]>;
    findById(id: string): Promise<import("./entities/user.entity").User>;
    findByEmail(loginDto: LoginDto): Promise<import("./entities/user.entity").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    remove(req: any, loginDto: LoginDto): Promise<string>;
}
