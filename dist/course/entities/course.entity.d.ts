import { User } from "src/user/entities/user.entity";
export declare class Course {
    id: number;
    name: string;
    duration: string;
    rate: number;
    buyersCount: number;
    description: string;
    body: string;
    author: User;
    Comments: {
        body: string;
        author: User;
    }[];
}
