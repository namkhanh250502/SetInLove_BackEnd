import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class StoriesGuard implements CanActivate {
  
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = await context.switchToHttp().getRequest();
    console.log('req: ', req.headers.authorization);
    const token = await req.headers.authorization.replace('Bearer ','')
    console.log('req.headers.authorization: ', req.headers.authorization);
    if(!token) {
      throw new UnauthorizedException('Không tìm thấy token!')
    }
    try {
      const payload = await this.jwtService.verifyAsync(token,{ secret: process.env.JWT_SECRET })
      req['user'] = payload.id
    } catch (error) {
      console.log('error: ', error);    
    }
    return true;
  }
}