import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { RedisClientType, createClient } from 'redis'

@Injectable()
export class RedisService implements OnApplicationBootstrap
{
    public clientAccess: RedisClientType;
  constructor(
    private configService:ConfigService
  ) {};

  public async onApplicationBootstrap() {
    this.clientAccess = createClient({
        username:this.configService.get('REDIS_USER'),
        password:this.configService.get('REDIS_PASS'),
        socket:{
            port:this.configService.get('REDIS_PORT'),
            host:this.configService.get('REDIS_HOST')
        }
    });

    this.clientAccess.on('error', err => console.log('Redis Client Error', err));

    await this.clientAccess.connect();
  };

  public async getValue(key: string): Promise<string>{
    const value = await this.clientAccess.get(key)
    if (typeof value !== 'string') throw "myException";
    return value
  }

  public async setValue(key: string, second: number,data: string){
    await this.clientAccess.setEx(key, second ,data)
  }

  public async removeValue(key: string){
    await this.clientAccess.del(key)
  }
};