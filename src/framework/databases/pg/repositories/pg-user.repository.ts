import { ObjectLiteral } from "typeorm";
import { IUserRepository } from "../core/abstract/user-repository.abstract";
import { PgGenericRepository } from "./pg-generic.repository";

export class PgUserRepository<T extends ObjectLiteral> 
    extends PgGenericRepository<T>
    implements IUserRepository<T>
{
    
};