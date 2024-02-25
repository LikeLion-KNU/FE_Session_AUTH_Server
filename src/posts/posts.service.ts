import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PostModel } from "src/models/post.model";
import { Repository } from "typeorm";
import { CreatePostDto } from "./dto/create-post.dto";
import { UserModel } from "src/models/user.model";

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(PostModel)
        private readonly postsRepository: Repository<PostModel>,
    ) {}

    public readAllPosts() {
        return this.postsRepository.find({
            select: ["id", "title", "author", "createdAt"],
        });
    }

    public readPostById(postId: number) {
        return this.postsRepository.findOne({
            where: { id: postId },
            relations: { author: true },
        });
    }

    public async createPost(user: UserModel, createPostDto: CreatePostDto) {
        const newPost = this.postsRepository.create({
            ...createPostDto,
            author: user,
        });
        await this.postsRepository.save(newPost);
        return { postId: newPost.id };
    }
}
