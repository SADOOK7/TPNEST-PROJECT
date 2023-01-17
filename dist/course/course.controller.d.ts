import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    create(createCourseDto: CreateCourseDto, req: any): Promise<{
        author: import("../user/entities/user.entity").User;
        name: string;
        duration: string;
        description: string;
        body: string;
    } & import("./entities/course.entity").Course>;
    findAll(): Promise<import("./entities/course.entity").Course[]>;
    findByName(name: string): Promise<import("./entities/course.entity").Course>;
    findByAuthor(authorId: string): Promise<any[]>;
    update(id: string, updateCourseDto: UpdateCourseDto, req: any): Promise<import("typeorm").UpdateResult>;
    remove(id: string, req: any): Promise<string>;
    likeCourse(name: string, req: any): Promise<import("./entities/course.entity").Course>;
    dislikeCourse(name: string, req: any): Promise<import("./entities/course.entity").Course>;
    buyCourse(name: string, req: any): Promise<import("./entities/course.entity").Course>;
    commentCourse(name: string, comment: string, req: any): Promise<import("./entities/course.entity").Course>;
}
