import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { IDatabaseAbstract } from 'src/framework/databases/pg/core/abstract/database.abstract';
import { IUser } from './interface/user.interfsce';

@Injectable()
export class PostService {

  constructor(
    private databaseService: IDatabaseAbstract
  ){}

  async create(createPostDto: CreatePostDto, user:IUser) {
    const saveData = {userid:user, ...createPostDto}
    return await this.databaseService.posts.create(saveData)
  }

  async findAll(page:number, takeData:number) {
    const take = takeData
    const skip = (page-1)*(takeData)
    const query = {
      select :{
        id:true,
        tittle:true,
        content: true,
        like:true,
        createdAt: true,
        userid:{
          fullName: true
        }
      },
      relations: ["userid"],
      take: take,
      skip: skip,
      where: { deleteAt: null }, order: { createdAt: "DESC" },
  }
    return await this.databaseService.posts.findAllPost(query)
  }

  async addLike(id: number) {
    const getPost = await this.databaseService.posts.findOne({where: {id: id}})
    if(typeof getPost?.like !== 'undefined'){
      return await this.databaseService.posts.update(id, {like: getPost.like + 1})}
  }

  async update(id: number, updatePostDto: UpdatePostDto, user:IUser) {
    const postData = {userid:user, ...updatePostDto}
    return await this.databaseService.posts.update(id, postData)
  }

  async remove(id: number) {
    return await this.databaseService.posts.delete(id)
  }
}
