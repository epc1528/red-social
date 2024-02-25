import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PgDatabaseModule } from 'src/framework/databases/pg/pg-data.module';
import { JwtModule } from 'src/lib/jwt/jwt.module';
import { RedisModule } from 'src/framework/databases/redis/redis.module';
import { RedisService } from 'src/framework/databases/redis/redis.service';

@Module({
  controllers: [UserController],
  providers: [UserService,RedisService],
  imports:[PgDatabaseModule,JwtModule, RedisModule]
})
export class UserModule {}
