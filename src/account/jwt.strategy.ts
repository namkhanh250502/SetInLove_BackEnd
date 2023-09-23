import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma.service";

export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
    constructor(private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        })
       
    }
    async validate(payload:{username: string, id: number}) {
        const users = await this.prisma.account.findFirst({
            where:{
                username: payload.username,
                id: payload.id
            }
        })
        return users
    }
}