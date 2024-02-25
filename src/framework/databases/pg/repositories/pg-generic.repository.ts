import { FindOptionsWhere, ObjectLiteral, Repository } from "typeorm";
import { IGenericRepository } from "../core/abstract/generic-repository.abstract";

export class PgGenericRepository<T extends ObjectLiteral> implements IGenericRepository<T> {
    public _repository: Repository<T>;
  
    constructor(repository: Repository<T>) {
      this._repository = repository;
    };
  
    public async findAll(): Promise<T[]> {
      return this._repository.find();
    };
  
    public async findOne(id:Object): Promise<T | null> {
      return await this._repository.findOne(id);
    };
  
    public async create(item: T): Promise<T> {
      return this._repository.save(item);
    };
  
    public async update(id: number, item: T): Promise<void> {
      this._repository.update(id, item);
    };
  
    public async delete(id: number): Promise<void> {
      this._repository.softDelete(id);
    };
};