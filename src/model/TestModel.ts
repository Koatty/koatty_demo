/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-10-16 20:02:52
 */
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity('Test')
export class TestModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;
}