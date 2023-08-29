/*
 * @Description: 数据持久层
 * @Usage: 
 * @Author: xxx
 * @Date: 2020-12-22 15:24:25
 * @LastEditTime: 2023-08-18 11:24:16
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

  @Column({ default: "" })
  name: string;

  @Column()
  phoneNum: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}