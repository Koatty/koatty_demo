/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-10-18 10:56:20
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
            }
        };
    }


}