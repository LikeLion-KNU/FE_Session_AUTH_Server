import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PostModel } from "./post.model";

@Entity()
export class UserModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    userId: string;

    @Column()
    userPw: string;

    @Column()
    nickname: string;

    @OneToMany(() => PostModel, (post) => post.author)
    posts: PostModel[];
}
