/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-11-14 19:31:09
 */
import { BaseModel } from "thinkorm";
import { Component, Value, Helper, Logger } from 'koatty';

@Component()
export class RoleModel extends BaseModel {
    @Value("database", "db")
    config: any;
    modelName: string;
    fields: any;

    init() {
        // 模型名称
        this.modelName = 'Role';
        // 数据表字段信息
        this.fields = {
            id: { //用户ID
                type: 'integer',
                pk: true,
                size: 11
            },
            name: { //角色名称
                type: 'string',
                size: 100,
                index: true,
                defaults: ''
            },
            desc: { //角色描述
                type: 'string',
                size: 200,
                defaults: ''
            },
            rule_ids: { //角色功能权限1,2,3
                type: 'text',
                defaults: ''
            },
            data_ids: { //角色数据权限1,2,3
                type: 'text',
                defaults: ''
            },
            ext: { //角色扩展
                type: 'text',
                defaults: ''
            },
            status: { //角色状态
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
     * 获取信息
     *
     * @param {*} username
     * @param {*} password
     * @returns
     */
    async getInfo(id: string) {
        let data = this.getCache("ROLE_INFO", id);
        if (Helper.isEmpty(data)) {
            data = await this.where({ id }).find();
            // tslint:disable-next-line: no-unused-expression
            data || this.flashCache("ROLE_INFO", id, data);
        }
        return data || {};
    }

    /**
     *
     *
     * @param {string} name
     * @param {string} key
     * @returns
     */
    async getCache(name: string, key: string) {
        try {
            let info = await this.app.cacheStore.hget(name, key).catch((err: any) => { });
            if (info) {
                info = JSON.parse(info);
            }
            return info;
        } catch (e) {
            // tslint:disable-next-line: no-null-keyword
            return null;
        }
    }

    /**
     *
     *
     * @param {string} name
     * @param {string} key
     * @param {*} value
     * @returns
     */
    async flashCache(name: string, key: string, value?: any) {
        await this.app.cacheStore.hdel(name, key).catch((err: any) => {
            Logger.error(err);
        });
        if (value) {
            return this.app.cacheStore.hset(name, key, JSON.stringify(value)).catch((err: any) => {
                Logger.error(err);
            });
        }
        return Promise.resolve();
    }

    /**
     *
     *
     * @param {*} data
     * @param {*} [options]
     * @returns
     */
    _afterAdd(data: any, options?: any) {
        this.flashCache("ROLE_INFO", data.id);
        return Promise.resolve(data);
    }

    /**
     *
     *
     * @param {*} data
     * @param {*} [options]
     * @returns
     */
    _afterUpdate(data: any, options?: any) {
        this.flashCache("ROLE_INFO", options.id || data.id);
        return Promise.resolve(data);
    }

    /**
     *
     *
     * @param {*} options
     * @returns
     */
    _afterDelete(options: any) {
        this.flashCache("ROLE_INFO", options.id);
        return Promise.resolve();
    }
}