import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/signin.dto";
import { SignUpDto } from "./dto/signup.dto";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("/signin")
    public signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto);
    }

    @Post("/signup")
    public signUp(@Body() signUpDto: SignUpDto) {
        return this.authService.signUp(signUpDto);
    }
}
