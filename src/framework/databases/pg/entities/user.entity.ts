import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from "typeorm";
import { Post } from "./post.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:string;

    @Column({length: 60})
    fullName:string;

    @Column("int")
    age:number;

    @Column()
    email:string;

    @Column({length: 20})
    password:string;

    @OneToMany(type => Post, post => post.userid)
    posts:Post[];

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updateAt:Date;

    @DeleteDateColumn()
    deleteAt:Date;
}