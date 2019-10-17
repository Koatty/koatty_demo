/**
 * @ author: richen
 * @ copyright: Copyright (c) - <richenlin(at)gmail.com>
 * @ license: MIT
 * @ version: 2019-10-16 19:57:53
 */
import { BaseModel } from "thinkorm";
import { Component, Value } from 'koatty';

@Component()
export class UserModel extends BaseModel {
    @Value("database", "db")
    config: any;
    modelName: string;
    fields: any;

    init() {
        // 模型名称
        this.modelName = 'User';
        // 数据表字段信息
        this.fields = {
            id: { //用户ID
                type: 'string',
                pk: true,
                size: 50
            },
            firstName: {
                type: 'string',
                unique: true,
                size: 50,
                defaults: ''
            }
        };
    }
}