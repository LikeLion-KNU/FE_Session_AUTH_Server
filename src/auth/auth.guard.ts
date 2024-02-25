import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const token = this.authService.extractToken(
            request.headers.authorization,
        );
        const decodedToken = await this.authService.verifyToken(token);
        const user = await this.usersService.readUserById(
            decodedToken.userId,
            false,
        );

        request.user = user;
        request.token = token;

        return true;
    }
}
