import {CanActivate,ExecutionContext,Injectable,UnauthorizedException,} from '@nestjs/common';
import { JwtService } from '../jwt/jwt.service';
import { Request } from 'express';
import { RedisService } from 'src/framework/databases/redis/redis.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private redisService: RedisService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.validateTokens(token);
      if(typeof payload === 'object'){
          const tokenUserRedis = JSON.parse(await this.redisService.getValue(payload.email))
          await this.redisService.getValue(tokenUserRedis.id+'access')
          request['user'] = tokenUserRedis;
        }
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}