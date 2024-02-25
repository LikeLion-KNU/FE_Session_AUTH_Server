import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SignUpDto } from "src/auth/dto/signup.dto";
import { UserModel } from "src/models/user.model";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserModel)
        private readonly usersRepository: Repository<UserModel>,
    ) {}

    public async readUserById(userId: string, withPassword: boolean) {
        return this.usersRepository.findOne({
            where: { userId },
            select: { userPw: withPassword },
        });
    }

    public async createUser(signUpDto: SignUpDto) {
        const isUserExists = await this.usersRepository.exists({
            where: { userId: signUpDto.userId },
        });

        if (isUserExists)
            throw new BadRequestException("이미 존재하는 아이디입니다");

        const newUser = this.usersRepository.create(signUpDto);
        return this.usersRepository.save(newUser);
    }
}
