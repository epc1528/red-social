import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PgDatabaseModule } from 'src/framework/databases/pg/pg-data.module';
import { JwtModule } from 'src/lib/jwt/jwt.module';
import { RedisModule } from 'src/framework/databases/redis/redis.module';
import { RedisService } from 'src/framework/databases/redis/redis.service';
import { MailModule } from 'src/lib/send_mail/mail.module';
import { MailService } from 'src/lib/send_mail/mail.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, RedisService, MailService],
  imports:[PgDatabaseModule,JwtModule,RedisModule,MailModule]
})
export class AuthModule {}
