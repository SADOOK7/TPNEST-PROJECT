import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private config: ConfigService,
    private jwt: JwtService) {}

  async signToken(userId: number, email: string){
    const secret = this.config.get('secret');
    const payload = {
      sub: userId,
      email: email
    }
    return this.jwt.signAsync(payload, {
      secret: secret
    })
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({where: {
      email: createUserDto.email,
    }})

    if(user){
      throw new ForbiddenException('this email is already in use');
    }
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await this.userRepository.save(createUserDto);
    delete newUser.password;

    // creating a token for the new user
    const token = this.signToken(newUser.id, newUser.email);
    return newUser;
    
  }

  async findAllUsers() {
    return await this.userRepository.find({relations: ['Buyed', 'favorites']});
  }

  async findUserByEmail(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({where: {
      email: loginDto.email,
    }})
    if(!user){
      throw new ForbiddenException('Wrong email or password!');
    }
    const correctPassword = await bcrypt.compare(
      loginDto.password,
      user.password
    )
    if(!correctPassword){
      throw new ForbiddenException('Wrong email or password!');
    }

    delete user.password;
    // creating a token for the user
    const token = this.signToken(user.id, user.email);
    return user;
  }

  async findUserById(userId: number) {
    const user = await this.userRepository.findOne({where: {
      id: userId,
    }})
    if(!user){
      throw new ForbiddenException('No user with such id');
    }
    delete user.password;
    return user;
  }

  async updateUser(
    userId,
    updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userRepository.findOne({where: {
      id: userId,
    }})
    if(!user){
      throw new ForbiddenException('No user with such id');
    }

    updateUserDto.password = await bcrypt.hash(updateUserDto.password,10);
    return await this.userRepository.update(userId,updateUserDto);
  }

  async deleteUser(userId: number, loginDto: LoginDto) {
    const user = await this.userRepository.findOne({where: {
      email: loginDto.email,
    }})
    if(!user){
      throw new ForbiddenException('Wrong email or password!');
    }
    const correctPassword = await bcrypt.compare(
      loginDto.password,
      user.password
    )
    if(!correctPassword){
      throw new ForbiddenException('Wrong email or password!');
    }

    const deletedUser = await this.userRepository.delete(userId);
    return 'User Deleted Successfully';
  }
}
