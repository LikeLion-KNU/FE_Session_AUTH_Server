import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostModel } from "src/models/post.model";
import { AuthModule } from "src/auth/auth.module";
import { UsersModule } from "src/users/users.module";

@Module({
    imports: [TypeOrmModule.forFeature([PostModel]), AuthModule, UsersModule],
    controllers: [PostsController],
    providers: [PostsService],
})
export class PostsModule {}
