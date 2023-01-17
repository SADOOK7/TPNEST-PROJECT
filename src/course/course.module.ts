import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategy } from 'src/user/startegy/jwt.startegy';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, User]), JwtModule.register({})],
  controllers: [CourseController],
  providers: [CourseService, JWTStrategy]
})
export class CourseModule {}
