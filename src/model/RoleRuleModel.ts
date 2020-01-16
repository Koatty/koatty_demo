/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2020-01-16 19:28:41
 */
import { BaseModel, Entity, PrimaryColumn, Column, TimestampColumn } from "thinkorm";
import { Component, Value, Helper } from 'koatty';

@Component()
@Entity("RoleRule")
export class RoleRuleModel extends BaseModel {
    @Value("database", "db")
    config: any;

    /**
     * 
     *
     * @type {number}
     * @memberof RoleRuleModel
     */
    @PrimaryColumn()
    id: number;

    /**
     * 规则路径
     *
     * @type {string}
     * @memberof RoleRuleModel
     */
    @Column(100, "", true)
    name: string;

    /**
     * 规则描述
     *
     * @type {string}
     * @memberof RoleRuleModel
     */
    @Column(200, "")
    desc: string;

    /**
     * 规则父级ID
     *
     * @type {number}
     * @memberof RoleRuleModel
     */
    @Column(11, undefined, true)
    pid: number;

    /**
     * 规则等级
     *
     * @type {number}
     * @memberof RoleRuleModel
     */
    @Column(11, undefined, true)
    level: number;

    /**
     * 规则匹配条件
     *
     * @type {string}
     * @memberof RoleRuleModel
     */
    @Column(256, "")
    condition: string;

    /**
     * 是否作为菜单
     *
     * @type {number}
     * @memberof RoleRuleModel
     */
    @Column(11, 0, true)
    isshow: number;

    /**
     * 菜单图标
     *
     * @type {string}
     * @memberof RoleRuleModel
     */
    @Column(200, "")
    icon: string;

    /**
     * 菜单顺序
     *
     * @type {number}
     * @memberof RoleRuleModel
     */
    @Column(11, 0, true)
    listorders: number;

    /**
     * 创建时间
     *
     * @type {number}
     * @memberof RoleRuleModel
     */
    @TimestampColumn("_beforeAdd")
    create_time: number;

    /**
     * 更新时间
     *
     * @type {number}
     * @memberof RoleRuleModel
     */
    @TimestampColumn()
    update_time: number;

    /**
     * 状态
     *
     * @type {number}
     * @memberof RoleRuleModel
     */
    @Column(11, 1, true)
    status: number;

    /**
     *
     *
     * @param {string} roleid
     * @param {number[]} ids
     * @memberof RoleRuleModel
     */
    async getRoleRules(roleid: string, ids: number[]) {
        let roleRules = await this.app.cacheStore.hget("ROLE_RULES", roleid);
        try {
            roleRules = JSON.parse(roleRules);
        } catch (e) {
            roleRules = [];
        }
        if (Helper.isEmpty(roleRules)) {
            roleRules = await this.field('id,pid,name,desc,icon').where({ id: ids, status: 1 }).select();
            this.app.cacheStore.hset("ROLE_RULES", roleid, JSON.stringify(roleRules));
        }

        return roleRules;

    }
}