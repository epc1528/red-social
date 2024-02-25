import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id?:string;

    @Column({length: 100})
    tittle?:string;

    @Column("text")
    content?:string;

    @Column("int",{nullable:true})
    like?:number;

    @ManyToOne(type => User, user => user.posts)
    @JoinColumn()
    userid?:User;

    @CreateDateColumn()
    createdAt?:Date;

    @UpdateDateColumn()
    updateAt?:Date;

    @DeleteDateColumn()
    deleteAt?:Date;
}