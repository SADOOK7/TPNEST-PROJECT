import { Course } from "src/course/entities/course.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Course, (course) => course.author)
    courses: Course[];

    @ManyToMany(() => Course)
    @JoinTable()
    Buyed: Course[];

    @ManyToMany(() => Course)
    @JoinTable()
    favorites: Course[];
}
