/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2020-01-16 19:17:16
 */
import { BaseModel, Entity, PrimaryColumn, Column, TimestampColumn } from "thinkorm";
import { Component, Value, Helper } from 'koatty';

@Component()
@Entity("RoleData")
export class RoleDataModel extends BaseModel {
    @Value("database", "db")
    config: any;

    /**
     *
     *
     * @type {number}
     * @memberof RoleDataModel
     */
    @PrimaryColumn()
    id: number;

    /**
     * 数据模型类名称
     *
     * @type {string}
     * @memberof RoleDataModel
     */
    @Column(100, '', true)
    name: string;

    /**
     * 数据规则描述
     *
     * @type {string}
     * @memberof RoleDataModel
     */
    @Column(200, "")
    desc: string;

    /**
     * 数据筛选条件
     *
     * @type {string}
     * @memberof RoleDataModel
     */
    @Column(256, "")
    condition: string;

    /**
     * 创建时间
     *
     * @type {number}
     * @memberof RoleDataModel
     */
    @TimestampColumn("_beforeAdd")
    create_time: number;

    /**
     * 更新时间
     *
     * @type {number}
     * @memberof RoleDataModel
     */
    @TimestampColumn()
    update_time: number;

    /**
     * 状态
     *
     * @type {number}
     * @memberof RoleDataModel
     */
    @Column(11, 1, true)
    status: number;
}