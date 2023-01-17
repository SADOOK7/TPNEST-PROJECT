import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
export declare class CourseService {
    private courseRepository;
    private userRepository;
    constructor(courseRepository: Repository<Course>, userRepository: Repository<User>);
    addCourse(authorId: number, createCourseDto: CreateCourseDto): Promise<{
        author: User;
        name: string;
        duration: string;
        description: string;
        body: string;
    } & Course>;
    findAllCourses(): Promise<Course[]>;
    findByName(name: string): Promise<Course>;
    findByAuthor(authorId: number): Promise<any[]>;
    updateCourse(id: number, currentUserId: number, updateCourseDto: UpdateCourseDto): Promise<import("typeorm").UpdateResult>;
    deleteCourse(id: number, currentUserId: number): Promise<string>;
    buyCourse(userId: number, courseName: string): Promise<Course>;
    addCourseToFavorites(userId: number, courseName: string): Promise<Course>;
    deleteCourseFromFavorites(userId: number, courseName: string): Promise<Course>;
    commentCourse(userId: number, courseName: string, comment: string): Promise<Course>;
}
