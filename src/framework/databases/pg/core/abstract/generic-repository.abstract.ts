export abstract class IGenericRepository<T> {
    public abstract findAll(): Promise<T[]>;
    public abstract findOne(id:Object): Promise<T | null>;
    public abstract create(item:T|T[]): Promise<T|T[]>;
    public abstract update(id:number, item: T): Promise<void>;
    public abstract delete(id:number): Promise<void>;
};