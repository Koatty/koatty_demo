/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-11-14 19:31:03
 */
import { BaseModel } from "thinkorm";
import { Component, Value, Helper } from 'koatty';

@Component()
export class GroupModel extends BaseModel {
    @Value("database", "db")
    config: any;
    modelName: string;
    fields: any;

    init() {
        // 模型名称
        this.modelName = 'Group';
        // 数据表字段信息
        this.fields = {
            id: { //用户ID
                type: 'integer',
                pk: true,
                size: 11
            },
            name: { //组织名称
                type: 'string',
                size: 100,
                index: true,
                defaults: ''
            },
            icon: { //组织图标
                type: 'string',
                size: 100,
                defaults: ''
            },
            desc: { //组织描述
                type: 'string',
                size: 200,
                defaults: ''
            },
            address: { //组织地址
                type: 'string',
                size: 200,
                defaults: ''
            },
            phone: { //组织电话
                type: 'string',
                size: 30,
                index: true,
                defaults: ''
            },
            email: { //组织邮箱
                type: 'string',
                size: 30,
                index: true,
                defaults: ''
            },
            attribute: { //组织标签
                type: 'text',
                defaults: ''
            },
            type: { //组织类型
                type: 'integer',
                size: 11,
                index: true
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