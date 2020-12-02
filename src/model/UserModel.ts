/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2020-01-16 19:38:15
 */
import { BaseModel, Entity, PrimaryColumn, Column, TimestampColumn } from "thinkorm";
import { Component, Value, Helper, Logger, IsIn } from 'koatty';
import { App } from '../App';

@Component()
@Entity("User")
export class UserModel extends BaseModel {
    app: App;
    @Value("database", "db")
    config: any;

    @PrimaryColumn(32, false)
    id: string;

    /**
     * 第三方绑定登录账号
     *
     * @type {string}
     * @memberof UserModel
     */
    @Column(50, "", true)
    openid: string;

    /**
     * 手机号（登录账号）
     *
     * @type {string}
     * @memberof UserModel
     */
    @Column(30, "", true, true)
    phonenum: string;

    /**
     * 用户email（登录账号）
     *
     * @type {string}
     * @memberof UserModel
     */
    @Column(50, "", true, true)
    email: string;

    /**
     * 登录密码
     *
     * @type {string}
     * @memberof UserModel
     */
    @Column(32, "")
    password: string;

    /**
     * 用户昵称
     *
     * @type {string}
     * @memberof UserModel
     */
    @Column(50, "")
    nickname: string;

    /**
     * 姓名
     *
     * @type {string}
     * @memberof UserModel
     */
    @Column(50, "")
    realname: string;

    /**
     * 用户头像
     *
     * @type {string}
     * @memberof UserModel
     */
    @Column(256, "")
    icon: string;

    /**
     * 用户最后登录时间
     *
     * @type {number}
     * @memberof UserModel
     */
    @Column(11, 0)
    last_login_time: number;

    /**
     * 用户最后登录ip
     *
     * @type {string}
     * @memberof UserModel
     */
    @Column(50, "")
    last_login_ip: string;

    /**
     * 用户生日
     *
     * @type {string}
     * @memberof UserModel
     */
    @Column(11, 0)
    birthday: number;

    /**
     * 用户性别0女1男2不确定
     *
     * @type {number}
     * @memberof UserModel
     */
    @IsIn([0, 1, 2])
    @Column(11, 2, true)
    gender: number;

    /**
     * 用户网站
     *
     * @type {string}
     * @memberof UserModel
     */
    @Column(100, "")
    website: string;

    /**
     * 用户简介
     *
     * @type {string}
     * @memberof UserModel
     */
    @Column(256, "")
    remark: string;

    /**
     * 创建时间
     *
     * @type {number}
     * @memberof UserModel
     */
    @TimestampColumn("_beforeAdd")
    create_time: number;

    /**
     * 更新时间
     *
     * @type {number}
     * @memberof UserModel
     */
    @TimestampColumn()
    update_time: number;

    /**
     * 状态
     *
     * @type {number}
     * @memberof UserModel
     */
    @Column(11, 1, true)
    status: number;

    /**
     * 到期时间
     *
     * @type {number}
     * @memberof UserModel
     */
    @Column(11, 0)
    end_time: number;

    /**
     * 角色ID
     *
     * @type {number}
     * @memberof UserModel
     */
    @Column(11, 0, true)
    roleid: number;

    /**
     * 组织ID
     *
     * @type {number}
     * @memberof UserModel
     */
    @Column(11, 0, true)
    groupid: number;



    /**
     *
     *
     * @param {*} data
     * @returns
     * @memberof UserModel
     */
    autoPassword(data: any) {
        return Helper.md5(data.password);
    }


    /**
     *
     *
     * @param {*} data
     * @returns
     * @memberof UserModel
     */
    autoBirthday(data: any) {
        return Helper.dateTime(data.birthday);
    }


    /**
     *
     *
     * @param {*} data
     * @param {*} options
     * @returns
     * @memberof UserModel
     */
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
            data.gender = Helper.toInteger(data.gender);
        }
        if (!Helper.isEmpty(data.roleid)) {
            data.roleid = Helper.toInteger(data.roleid);
        }
        if (!Helper.isEmpty(data.groupid)) {
            data.groupid = Helper.toInteger(data.groupid);
        }
        if (!Helper.isEmpty(data.status)) {
            data.status = Helper.toInteger(data.status);
        }
        return Promise.resolve(data);
    }


    /**
     *
     *
     * @param {*} data
     * @param {*} options
     * @returns
     * @memberof UserModel
     */
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
            data.status = Helper.toInteger(data.status);
        }
        if (!Helper.isEmpty(data.gender)) {
            data.gender = Helper.toInteger(data.gender);
        }
        if (!Helper.isEmpty(data.roleid)) {
            data.roleid = Helper.toInteger(data.roleid);
        }
        if (!Helper.isEmpty(data.groupid)) {
            data.groupid = Helper.toInteger(data.groupid);
        }
        if (!Helper.isEmpty(data.status)) {
            data.status = Helper.toInteger(data.status);
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