import { ICreateUser } from "src/api/user/interface/create-user.interface";
import { Post, User } from "../../entities";

import { IPostRepository } from "./post-repository.abstract";
import { IUserRepository } from "./user-repository.abstract";
import { ICreatePost } from "src/api/post/interface/create-post.interface";

export abstract class IDatabaseAbstract {
    public abstract readonly posts: IPostRepository<ICreatePost>;
    public abstract readonly users: IUserRepository<ICreateUser>;
};