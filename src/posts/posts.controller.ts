import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { User } from "src/users/users.decorator";
import { UserModel } from "src/models/user.model";

@Controller("posts")
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get()
    public async readAllPosts() {
        return this.postsService.readAllPosts();
    }

    @Get(":id")
    public async readPostById(@Param("id") id: string) {
        return this.postsService.readPostById(Number(id));
    }

    @Post()
    @UseGuards(AuthGuard)
    public async createPost(
        @User() user: UserModel,
        @Body() createPostDto: CreatePostDto,
    ) {
        return this.postsService.createPost(user, createPostDto);
    }
}
