import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'courses'})
export class Course {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    duration: string;

    @Column({default: 0})
    rate: number;

    @Column({default: 0})
    buyersCount: number;

    @Column({default: ''})
    description: string;

    @Column({default: ''})
    body: string;

    @ManyToOne(() => User, (user) => user.courses, { eager: true })
    author: User;

    @ManyToMany(() => User)
    @JoinTable()
    Comments: {
        body: string,
        author: User;
    }[]

}
