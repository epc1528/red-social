import { Module } from '@nestjs/common';
import { PgDatabaseModule } from './framework/databases/pg/pg-data.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';
import { RedisModule } from './framework/databases/redis/redis.module';
import { PostModule } from './api/post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    UserModule,
    AuthModule,
    PostModule,
    PgDatabaseModule,
    RedisModule],
  controllers: [],
  providers: [],
})
export class AppModule {}