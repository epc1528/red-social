import { Injectable } from '@nestjs/common';
import { IJwtAccess, IJwtValidator } from './interface/jwt.interface';
import * as jwt from 'jsonwebtoken'
import { jwtsecret } from 'src/util/config/enviroment';

@Injectable()
export class JwtService {
  constructor(
  ) {};
  
  generateTokens = async (params: IJwtAccess): Promise<string[]> =>{
    const jwtAccess = jwt.sign(JSON.stringify({Date:Math.floor(Date.now() / 1000) + 259200, ...params}), jwtsecret.secret)
    const jwtAccessRefres = jwt.sign({Date:Math.floor(Date.now() / 1000) + 518400, ...params}, jwtsecret.secret)
    return [jwtAccess,jwtAccessRefres]
  }

  validateTokens = async (params: string): Promise<string | jwt.JwtPayload> => {
    const jwtAccess = jwt.verify(params, jwtsecret.secret)
    return jwtAccess
  }
};