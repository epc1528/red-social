import { JwtService } from './jwt.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigModule],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}