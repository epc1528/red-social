import { Injectable } from '@nestjs/common';
import { AccessDto } from './dto/access.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { IDatabaseAbstract } from 'src/framework/databases/pg/core/abstract/database.abstract';
import { JwtService } from 'src/lib/jwt/jwt.service';
import { RedisService } from 'src/framework/databases/redis/redis.service';
import { MailService } from 'src/lib/send_mail/mail.service';

@Injectable()
export class AuthService {

  constructor(
    private databaseService: IDatabaseAbstract,
    private jwtService: JwtService,
    private redisSevice: RedisService,
    private mailService:MailService
  ){}

  async register(user: CreateUserDto) {
    await this.databaseService.users.create(user)
    await this.mailService.sendMail(user.email)
    return true
  }

  async login(access: AccessDto) {
    const user = await this.databaseService.users.findOne({where: {email: access.email}})
    if(user?.password == access.password){
      const tokens:string[] = await this.jwtService.generateTokens(access)
      await this.redisSevice.setValue((user?.id+'access'),259200,tokens[0])
      await this.redisSevice.setValue((user?.id+'refresh'),518400,tokens[1])
      await this.redisSevice.setValue(access.email, 518400, JSON.stringify(user))
      return tokens
    }
  }

  async logout(access: AccessDto) {
    const user = await this.databaseService.users.findOne({where: {email: access.email}})
    if(user?.id){
      await this.redisSevice.removeValue(user?.id+'access')
      await this.redisSevice.removeValue(user?.id+'refresh')
      await this.redisSevice.removeValue(user?.email)
    }
    return 1
  }

  async refresh(access: AccessDto) {
    const user = await this.databaseService.users.findOne({where: {email: access.email}})
    if(user?.password == access.password){
      const tokens:string[] = await this.jwtService.generateTokens(access)
      await this.redisSevice.setValue((user?.id+'access'),259200,tokens[0])
      await this.redisSevice.setValue((user?.id+'refresh'),518400,tokens[1])
      await this.redisSevice.setValue(access.email, 518400, JSON.stringify(user))
      return tokens
    }
  }
}
