/*
 * @Description: 数据实体层
 * @Usage: 
 * @Author: xxx
 * @Date: 2020-12-22 15:24:25
 * @LastEditTime: 2025-01-14 16:35:00
 */
import {
  Entity, PrimaryGeneratedColumn, CreateDateColumn,
  Column, UpdateDateColumn, BaseEntity
} from "typeorm";
import { Component } from 'koatty';

@Component()
@Entity('user')
export class UserEntity extends BaseEntity {
  
  @PrimaryGeneratedColumn({type: "bigint"})
  id: number;

  @Column()
  name: string;

  @Column()
  phoneNum: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}