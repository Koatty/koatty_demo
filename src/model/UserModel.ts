/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-12-27 19:43:25
 */
import { BaseModel } from "thinkorm";
import { Component, Value, Helper, Logger } from 'koatty';
import { App } from '../App';

@Component()
export class UserModel extends BaseModel {
    app: App;
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
                size: 32
            },
            openid: { //预留第三方登录
                type: 'string',
                unique: true,
                size: 50,
                defaults: ''
            },
            phonenum: { //手机号（登录账号）
                type: 'string',
                index: true,
                size: 30,
                defaults: ''
            },
            password: { //登录密码
                type: 'string',
                size: 32,
                defaults: ''
            },
            email: { //用户email（登录账号）
                type: 'string',
                index: true,
                size: 50,
                defaults: ''
            },
            nickname: { //用户昵称
                type: 'string',
                unique: true,
                size: 50,
                defaults: ''
            },
            realname: { //用户真实名称
                type: 'string',
                size: 50,
                defaults: ''
            },
            icon: { //用户头像
                type: 'text',
                defaults: ''
            },
            last_login_time: { //用户最后登录时间
                type: 'integer',
                defaults: 0
            },
            last_login_ip: { //用户最后登录ip
                type: 'string',
                defaults: ''
            },
            birthday: { //用户生日
                type: 'integer',
                defaults: 0
            },
            gender: { //用户性别0女1男2不确定
                type: 'integer',
                defaults: 2
            },
            website: { //用户网站
                type: 'string',
                size: 100,
                defaults: ''
            },
            remark: { //用户简介
                type: 'string',
                size: 255,
                defaults: ''
            },
            create_time: { //创建时间
                type: 'integer',
                defaults: 0
            },
            update_time: { //更新时间
                type: 'integer',
                defaults: 0
            },
            end_time: { //到期时间
                type: 'integer',
                defaults: 0
            },
            roleid: { //角色ID
                type: 'integer',
                index: true,
                defaults: 0
            },
            groupid: { //组织ID
                type: 'integer',
                index: true,
                defaults: 0
            },
            status: { //用户状态
                type: 'integer',
                index: true,
                defaults: 0
            }
        };
    }

    autoPassword(data: any) {
        return Helper.md5(data.password);
    }

    autoBirthday(data: any) {
        return Helper.datetime(data.birthday);
    }

    _beforeAdd(data: any, options: any) {
        const now = Helper.datetime();
        data.update_time = now;
        //针对
        if (!Helper.isEmpty(data.create_time) && Helper.isString(data.create_time)) {
            data.create_time = Helper.datetime(data.create_time);
        } else {
            data.create_time = now;
        }
        if (!Helper.isEmpty(data.birthday)) {
            data.birthday = this.autoBirthday(data);
        }
        if (!Helper.isEmpty(data.password)) {
            data.password = this.autoPassword(data);
        }
        if (Helper.isEmpty(data.end_time)) {
            data.end_time = Helper.toNumber(Helper.datetime()) + (60 * 60 * 24 * 90);
        } else {
            data.end_time = Helper.datetime(data.end_time);
        }
        if (!Helper.isEmpty(data.gender)) {
            data.gender = Helper.toInt(data.gender);
        }
        if (!Helper.isEmpty(data.roleid)) {
            data.roleid = Helper.toInt(data.roleid);
        }
        if (!Helper.isEmpty(data.groupid)) {
            data.groupid = Helper.toInt(data.groupid);
        }
        if (!Helper.isEmpty(data.status)) {
            data.status = Helper.toInt(data.status);
        }
        return Promise.resolve(data);
    }

    _beforeUpdate(data: any, options: any) {
        data.update_time = Helper.datetime();
        if (!Helper.isEmpty(data.create_time) && Helper.isString(data.create_time)) {
            data.create_time = Helper.datetime(data.create_time);
        }
        if (!Helper.isEmpty(data.birthday)) {
            data.birthday = this.autoBirthday(data);
        }
        if (!Helper.isEmpty(data.password)) {
            data.password = this.autoPassword(data);
        }
        if (data.end_time !== undefined) {
            if (Helper.isEmpty(data.end_time)) {
                data.end_time = Helper.toNumber(Helper.datetime()) + (60 * 60 * 24 * 90);
            } else {
                data.end_time = Helper.datetime(data.end_time);
            }
        }
        if (!Helper.isEmpty(data.status)) {
            data.status = Helper.toInt(data.status);
        }
        if (!Helper.isEmpty(data.gender)) {
            data.gender = Helper.toInt(data.gender);
        }
        if (!Helper.isEmpty(data.roleid)) {
            data.roleid = Helper.toInt(data.roleid);
        }
        if (!Helper.isEmpty(data.groupid)) {
            data.groupid = Helper.toInt(data.groupid);
        }
        if (!Helper.isEmpty(data.status)) {
            data.status = Helper.toInt(data.status);
        }
        return Promise.resolve(data);
    }

    /**
     * 获取用户信息
     *
     * @param {*} username
     * @param {*} password
     * @returns
     */
    async getUserInfoByName(username: string, password: string) {
        const data = await this.join([
            { from: 'Role', field: ['rule_ids', 'data_ids', 'status as role_status', 'name as role_name'], on: { 'roleid': 'id' } }
        ]).field(['id', 'openid', 'phonenum', 'email', 'nickname', 'realname', 'icon', 'birthday', 'gender', 'website', 'remark', 'roleid', 'groupid', 'end_time'])
            .where({ or: [{ email: username }, { phonenum: username }], password: Helper.md5(password) }).find();

        return data || {};
    }


    /**
     * 获取用户信息
     *
     * @param {*} username
     * @param {*} password
     * @returns
     */
    async getInfo(id: string) {
        let data = await this.getCache("USER_INFO", id);
        if (Helper.isEmpty(data)) {
            data = await this.join([
                { from: 'Role', field: ['rule_ids', 'data_ids', 'status as role_status', 'name as role_name'], on: { 'roleid': 'id' } }
            ]).field(['id', 'openid', 'phonenum', 'email', 'nickname', 'realname', 'icon', 'birthday', 'gender', 'website', 'remark', 'roleid', 'groupid', 'end_time'])
                .where({ id }).find();
            // tslint:disable-next-line: no-unused-expression
            await this.flashCache("USER_INFO", id, data);
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
        this.flashCache("USER_INFO", data.id);
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
        this.flashCache("USER_INFO", options.id || data.id);
        return Promise.resolve(data);
    }

    /**
     *
     *
     * @param {*} options
     * @returns
     */
    _afterDelete(options: any) {
        this.flashCache("USER_INFO", options.id);
        return Promise.resolve();
    }

    /**
     *
     *
     * @param {*} result
     * @param {*} options
     * @returns
     * @memberof UserModel
     */
    _afterFind(result: any, options: any) {
        try {
            if (!Helper.isEmpty(result)) {
                if (!Helper.isEmpty(result.password)) {
                    //过滤
                    // result.password = "";
                    delete result.password;
                }
                if (result.last_login_time && result.last_login_time > 0) {
                    result.last_login_time_str = Helper.datetime(result.last_login_time, 'yyyy-mm-dd hh:mi:ss');
                } else {
                    result.last_login_time_str = "";
                }
                if (result.create_time && result.create_time > 0) {
                    result.create_time_str = Helper.datetime(result.create_time, 'yyyy-mm-dd hh:mi:ss');
                } else {
                    result.create_time_str = "";
                }
                if (result.update_time && result.update_time > 0) {
                    result.update_time_str = Helper.datetime(result.update_time, 'yyyy-mm-dd hh:mi:ss');
                } else {
                    result.update_time_str = "";
                }
                if (result.end_time && result.end_time > 0) {
                    result.end_time_str = Helper.datetime(result.end_time, 'yyyy-mm-dd hh:mi:ss');
                } else {
                    result.end_time_str = "";
                }
            }
            return result;
        } catch (e) {
            return result;
        }
    }

    /**
     *
     *
     * @param {any[]} result
     * @param {*} options
     * @returns
     * @memberof UserModel
     */
    _afterSelect(result: any[], options: any) {
        const ps: any[] = [];
        result.map((item) => {
            ps.push(this._afterFind(item, options));
        });
        return Promise.all(ps);
    }
}