import { ObjectLiteral } from "typeorm";
import { IPostRepository } from "../core/abstract/post-repository.abstract";
import { PgGenericRepository } from "./pg-generic.repository";

export class PgPostRepository<T extends ObjectLiteral> 
    extends PgGenericRepository<T>
    implements IPostRepository<T>
{
    public async findAllPost(query:Object): Promise<Object> {
        
        const [result, total] = await this._repository.findAndCount(query);
        return {
            data: result,
            count: total
        }
      };
};