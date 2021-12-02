/*
 * @Description: 数据持久层
 * @Usage: 
 * @Author: xxx
 * @Date: 2020-12-22 15:24:25
 * @LastEditTime: 2021-12-01 10:43:46
 */
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, UpdateDateColumn, BaseEntity } from "typeorm";
import { Component } from 'koatty';
import { App } from '../App';

@Component()
@Entity('user')
export class UserModel extends BaseEntity {
    app: App;

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}