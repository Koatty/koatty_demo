/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-11-14 19:31:06
 */
import { BaseModel } from "thinkorm";
import { Component, Value, Helper } from 'koatty';

@Component()
export class RoleDataModel extends BaseModel {
    @Value("database", "db")
    config: any;
    modelName: string;
    fields: any;

    init() {
        // 模型名称
        this.modelName = 'RoleData';
        // 数据表字段信息
        this.fields = {
            id: { //用户ID
                type: 'integer',
                pk: true,
                size: 11
            },
            name: { //数据模型类名称
                type: 'string',
                size: 100,
                index: true,
                defaults: ''
            },
            desc: { //数据规则描述
                type: 'string',
                size: 200,
                defaults: ''
            },
            condition: { //数据筛选条件
                type: 'text',
                defaults: ''
            },
            create_time: { //创建时间
                type: 'integer',
                size: 11
            },
            update_time: { //更新时间
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
}