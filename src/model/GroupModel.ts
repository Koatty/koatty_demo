/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2020-01-16 19:17:10
 */
import { BaseModel, Entity, PrimaryColumn, Column, TimestampColumn } from "thinkorm";
import { Component, Value, Helper } from 'koatty';

@Component()
@Entity("Group")
export class GroupModel extends BaseModel {
    @Value("database", "db")
    config: any;

    /**
     * ID
     *
     * @type {number}
     * @memberof GroupModel
     */
    @PrimaryColumn()
    id: number;

    /**
     * 名称
     *
     * @type {string}
     * @memberof GroupModel
     */
    @Column(50, "", true)
    name: string;

    /**
     * 头像
     *
     * @type {string}
     * @memberof GroupModel
     */
    @Column(100, "")
    icon: string;

    /**
     * 组织描述
     *
     * @type {string}
     * @memberof GroupModel
     */
    @Column(200, "")
    desc: string;

    /**
     * 组织地址
     *
     * @type {string}
     * @memberof GroupModel
     */
    @Column(200, "")
    address: string;

    /**
     * 组织电话
     *
     * @type {string}
     * @memberof GroupModel
     */
    @Column(30, "")
    phone: string;

    @Column(30, "")
    email: string;

    /**
     * 组织标签
     *
     * @type {string}
     * @memberof GroupModel
     */
    @Column(256, "")
    attribute: string;

    /**
     * 组织类型
     *
     * @type {number}
     * @memberof GroupModel
     */
    @Column(11, undefined, true)
    type: number;

    /**
     * 创建时间
     *
     * @type {number}
     * @memberof GroupModel
     */
    @TimestampColumn("_beforeAdd")
    create_time: number;

    /**
     * 更新时间
     *
     * @type {number}
     * @memberof GroupModel
     */
    @TimestampColumn()
    update_time: number;

    /**
     * 状态
     *
     * @type {number}
     * @memberof GroupModel
     */
    @Column(11, 1, true)
    status: number;

}