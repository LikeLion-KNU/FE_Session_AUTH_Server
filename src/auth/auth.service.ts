import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JWT_EXPIRES, JWT_SECRET } from "./auth.config";
import { UsersService } from "src/users/users.service";
import { SignInDto } from "./dto/signin.dto";
import { SignUpDto } from "./dto/signup.dto";

export interface IToken {
    id: number;
    userId: string;
}

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
    ) {}

    public async signToken(id: number, userId: string) {
        const payload = {
            id: id,
            userId: userId,
        };
        const token = this.jwtService.sign(payload, {
            secret: JWT_SECRET,
            expiresIn: JWT_EXPIRES,
        });
        return { token };
    }

    public async verifyToken(token: string): Promise<IToken> {
        try {
            return this.jwtService.verify(token, {
                secret: JWT_SECRET,
            });
        } catch (err) {
            throw new UnauthorizedException("다시 로그인해주세요");
        }
    }

    public extractToken(headerAuthField: string) {
        try {
            const splittedToken = headerAuthField.split(" ");
            return splittedToken[1];
        } catch (err) {
            throw new UnauthorizedException("잘못된 형식의 토큰입니디");
        }
    }

    public async authenticateUser(userId: string, userPw: string) {
        const user = await this.usersService.readUserById(userId, true);

        if (!user) throw new NotFoundException("존재하지 않는 사용자입니다");

        if (user.userPw !== userPw)
            throw new UnauthorizedException("잘못된 비밀번호입니다");

        return this.signToken(user.id, user.userId);
    }

    public async signIn(signInDto: SignInDto) {
        return this.authenticateUser(signInDto.userId, signInDto.userPw);
    }

    public async signUp(signUpDto: SignUpDto) {
        const newUser = await this.usersService.createUser(signUpDto);
        return this.signToken(newUser.id, newUser.userId);
    }
}
