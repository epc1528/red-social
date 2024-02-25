import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IDatabaseAbstract } from 'src/framework/databases/pg/core/abstract/database.abstract';

@Injectable()
export class UserService {

  constructor(
    private databaseService: IDatabaseAbstract
  ){}

  async findOne(id: string) {
    return await this.databaseService.users.findOne({where:{id}})
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.databaseService.users.update(id, updateUserDto)
  }

  async remove(id: number) {
    return await this.databaseService.users.delete(id)
  }
}
