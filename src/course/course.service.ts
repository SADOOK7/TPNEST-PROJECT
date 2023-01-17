import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {

  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){}

  async addCourse(authorId: number, createCourseDto: CreateCourseDto) {
    const author = await this.userRepository.findOne({where: {
      id: authorId
    }})
    if(!author){
      throw new ForbiddenException('No author with such id');
    }
    delete author.password;

    const course = await this.courseRepository.save({
      ...createCourseDto,
      author
    })
    return course;
  }

  async findAllCourses() {
    return await this.courseRepository.find({relations: ['Comments']});
  }

  async findByName(name: string) {
    return await this.courseRepository.findOne({where: {
      name
    }});
  }

  async findByAuthor(authorId: number){
    const author = await this.userRepository.findOne({where: {
      id: authorId
    }})
    if(!author){
      throw new ForbiddenException('no user with such id!')
    }
    let courses = [];
    courses = await this.courseRepository.find({where: {
      author
    }})

    return courses;
  }

  async updateCourse(id: number, currentUserId: number, updateCourseDto: UpdateCourseDto) {
    const course = await this.courseRepository.findOne({where: {
      id
    }})

    if(!course){
      throw new ForbiddenException('No course with such id!');
    }

    if(course.author.id != currentUserId){
      console.log(course.author.id);
      throw new ForbiddenException('you are not the owner of the course');
    }

    return await this.courseRepository.update(id, updateCourseDto);
  }

  async deleteCourse(id: number, currentUserId: number) {
    const course = await this.courseRepository.findOne({where: {
      id
    }})

    if(!course){
      throw new ForbiddenException('No course with such id!');
    }

    if(course.author.id != currentUserId){
      throw new ForbiddenException('you are not the owner of the course');
    }

    const deletedUser = await this.courseRepository.delete(id);
    return 'Course Deleted Successfully';
  }

  async buyCourse(userId: number, courseName: string){
    const course = await this.findByName(courseName);
    const user = await this.userRepository.findOne({
      where: {id: userId},
      relations: ['Buyed']
    });

    user.Buyed.push(course);
    course.buyersCount++;
    await this.userRepository.save(user);
    await this.courseRepository.save(course);

    return course;
  }

  async addCourseToFavorites(
    userId: number,
    courseName: string
  ) {
    const course = await this.findByName(courseName);
    const user = await this.userRepository.findOne({
      where: {id: userId},
      relations: ['favorites']
    });

    const isNotFavorited =
      user.favorites.findIndex(
        (courseInFavorites) => courseInFavorites.id === course.id,
      ) === -1;

    if (isNotFavorited) {
      user.favorites.push(course);
      course.rate++;
      await this.userRepository.save(user);
      await this.courseRepository.save(course);
    }

    return course;
  }

  async deleteCourseFromFavorites(
    userId: number,
    courseName: string
  ) {
    const course = await this.findByName(courseName);
    const user = await this.userRepository.findOne({
      where: {id: userId},
      relations: ['favorites']
    });

    const courseIndex = user.favorites.findIndex(
      (courseInFavorites) => courseInFavorites.id === course.id,
    );

    if (courseIndex >= 0) {
      user.favorites.splice(courseIndex, 1);
      course.rate--;
      await this.userRepository.save(user);
      await this.courseRepository.save(course);
    }

    return course;
  }

  async commentCourse(
    userId: number,
    courseName: string,
    comment: string,
  ){
    const user = await this.userRepository.findOne({where: {id: userId}});
    const course = await this.courseRepository.findOne({
      where: {name: courseName},
      relations: ['Comments']
    });
    course.Comments.push({
      body: comment,
      author: user
    });
    await this.courseRepository.save(course);

    return course;
  }
}
