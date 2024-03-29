import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { PostsModule } from "./posts/posts.module";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserModel } from "./models/user.model";
import { PostModel } from "./models/post.model";

const RootEntities = [UserModel, PostModel];

const TypeOrmRootConfig = TypeOrmModule.forRoot({
    type: "sqlite",
    database: "database.db",
    synchronize: true,
    entities: RootEntities,
});

@Module({
    imports: [TypeOrmRootConfig, AuthModule, UsersModule, PostsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
