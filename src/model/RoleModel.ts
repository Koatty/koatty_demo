/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2020-01-16 19:21:10
 */
import { BaseModel, Entity, PrimaryColumn, Column } from "thinkorm";
import { Component, Value, Helper, Logger } from 'koatty';

@Component()
@Entity("Role")
export class RoleModel extends BaseModel {
    @Value("database", "db")
    config: any;


    /**
     *
     *
     * @type {number}
     * @memberof RoleModel
     */
    @PrimaryColumn()
    id: number;

    /**
     * 角色名称
     *
     * @type {string}
     * @memberof RoleModel
     */
    @Column(100, "", true)
    name: string;

    /**
     * 角色描述
     *
     * @type {string}
     * @memberof RoleModel
     */
    @Column(256, "")
    desc: string;

    /**
     * 角色功能权限1,2,3
     *
     * @type {string}
     * @memberof RoleModel
     */
    @Column(256, "")
    rule_ids: string;

    /**
     * 角色数据权限1,2,3
     *
     * @type {string}
     * @memberof RoleModel
     */
    @Column(256, "")
    data_ids: string;

    /**
     * 角色扩展
     *
     * @type {string}
     * @memberof RoleModel
     */
    @Column(256, "")
    ext: string;

    /**
     * 角色状态
     *
     * @type {number}
     * @memberof RoleModel
     */
    @Column(11, 1, true)
    status: number;


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
            Logger.Error(err);
        });
        if (value) {
            return this.app.cacheStore.hset(name, key, JSON.stringify(value)).catch((err: any) => {
                Logger.Error(err);
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