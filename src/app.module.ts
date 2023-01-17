import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { Course } from './course/entities/course.entity';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  TypeOrmModule.forRoot({
    type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'sadok',
      password: 'azerty',
      database: 'nest',
      entities: [User, Course],
      synchronize: true,
  }),
  UserModule,
  CourseModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
