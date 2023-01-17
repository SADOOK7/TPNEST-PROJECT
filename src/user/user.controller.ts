import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('adduser')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get('allusers')
  findAll() {
    return this.userService.findAllUsers();
  }

  @Get('userbyid/:id')
  findById(@Param('id') id: string) {
    return this.userService.findUserById(+id);
  }

  @Get('userbyemail')
  findByEmail(@Body() loginDto: LoginDto) {
    return this.userService.findUserByEmail(loginDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('updateuser/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('deleteuser')
  remove(@Request() req: any, @Body() loginDto: LoginDto) {
    return this.userService.deleteUser(req.user.userId, loginDto);
  }
}
