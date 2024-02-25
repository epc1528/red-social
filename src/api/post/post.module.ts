import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PgDatabaseModule } from 'src/framework/databases/pg/pg-data.module';
import { JwtModule } from 'src/lib/jwt/jwt.module';
import { RedisModule } from 'src/framework/databases/redis/redis.module';
import { RedisService } from 'src/framework/databases/redis/redis.service';

@Module({
  controllers: [PostController],
  providers: [PostService, RedisService],
  imports:[PgDatabaseModule,JwtModule, RedisModule]
})
export class PostModule {}
