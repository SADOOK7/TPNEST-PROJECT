import { Course } from "src/course/entities/course.entity";
export declare class User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    courses: Course[];
    Buyed: Course[];
    favorites: Course[];
}
