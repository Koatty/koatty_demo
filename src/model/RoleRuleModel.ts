/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-11-14 19:31:13
 */
import { BaseModel } from "thinkorm";
import { Component, Value, Helper } from 'koatty';

@Component()
export class RoleRuleModel extends BaseModel {
    @Value("database", "db")
    config: any;
    modelName: string;
    fields: any;

    init() {
        // 模型名称
        this.modelName = 'RoleRule';
        // 数据表字段信息
        this.fields = {
            id: { //用户ID
                type: 'integer',
                pk: true,
                size: 11
            },
            name: { //规则路径
                type: 'string',
                size: 100,
                index: true,
                defaults: ''
            },
            desc: { //规则描述
                type: 'string',
                size: 200,
                defaults: ''
            },
            pid: { //规则父级ID
                type: 'integer',
                index: true,
                size: 11
            },
            level: { //规则等级
                type: 'integer',
                index: true,
                size: 11
            },
            condition: { //规则匹配条件
                type: 'text',
                defaults: ''
            },
            isshow: { //是否作为菜单
                type: 'integer',
                index: true,
                size: 11
            },
            icon: { //菜单图标
                type: 'string',
                size: 200,
                defaults: ''
            },
            listorders: { //菜单顺序
                type: 'integer',
                size: 11
            },
            create_time: {
                type: 'integer',
                size: 11
            },
            update_time: {
                type: 'integer',
                size: 11
            },
            status: { //状态
                type: 'integer',
                size: 11,
                index: true
            }
        };
    }

    _beforeAdd(data: any, options: any) {
        const now = Helper.datetime();
        data.create_time = now;
        data.update_time = now;
        data.status = 1;
        return data;
    }

    _beforeUpdate(data: any, options: any) {
        const now = Helper.datetime();
        data.update_time = now;
        if (!Helper.isEmpty(data.status)) {
            data.status = Helper.toInt(data.status);
        }
        return data;
    }

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