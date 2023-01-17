import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategy } from './startegy/jwt.startegy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, JWTStrategy],
  exports: [JWTStrategy],
})
export class UserModule {}
