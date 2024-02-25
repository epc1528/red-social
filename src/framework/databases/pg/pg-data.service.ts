import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { IDatabaseAbstract } from "./core/abstract/database.abstract";
import { IPostRepository } from "./core/abstract/post-repository.abstract";
import { Post, User } from "./entities";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PgPostRepository } from "./repositories/pg-post.repository";
import { IUserRepository } from "./core/abstract/user-repository.abstract";
import { PgUserRepository } from "./repositories/pg-user.repository";

@Injectable()
export class PgDatabaseService
  implements IDatabaseAbstract, OnApplicationBootstrap
{
  public posts: IPostRepository<Post>;
  public users: IUserRepository<User>;

  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {};

  public onApplicationBootstrap() {
    this.posts = new PgPostRepository<Post>(this.postRepository);
    this.users = new PgUserRepository<User>(this.userRepository);
  };
};