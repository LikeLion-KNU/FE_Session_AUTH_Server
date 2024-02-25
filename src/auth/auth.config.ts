import { JwtModule } from "@nestjs/jwt";

export const JWT_SECRET = "likelionknu";
export const JWT_EXPIRES = 3600;

export const JWTModule = JwtModule.register({});
