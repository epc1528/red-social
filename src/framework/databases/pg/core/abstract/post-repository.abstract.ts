import { IGenericRepository } from "./generic-repository.abstract";

export abstract class IPostRepository<T> extends IGenericRepository<T> {
    public abstract findAllPost(query: Object): Promise<Object>;
};