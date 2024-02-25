import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { UserModel } from "./user.model";

@Entity()
export class PostModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(() => UserModel, (user) => user.posts)
    author: UserModel;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    content: string;
}
