/*
 * @Author: richen
 * @Date: 2019-12-31 12:03:58
 * @LastEditTime: 2020-10-26 20:23:37
 * @Description: 
 * @Copyright (c) - <richenlin(at)gmail.com>
 */
/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2020-05-10 14:55:37
 */
import { Service, Autowired, Helper, Value, Logger, BaseService } from "koatty";
import { App } from '../../App';
import { UserModel } from '../../model/UserModel';
import * as tool from "../../util/tool";

@Service()
export class PassportService extends BaseService {
    app: App;
    @Value("rbac.auth_superrole")
    private superRole: number;

    @Autowired()
    private userModel: UserModel;

    /**
     *
     *
     * @param {string} username
     * @param {string} password
     * @param {string} clientIp
     * @returns
     * @memberof PassportService
     */
    async loginAdmin(username: string, password: string, clientIp: string) {
        if (Helper.isEmpty(username) || Helper.isEmpty(password)) {
            return {};
        }

        const userData = await this.getAdminUser(username, password, true);
        if (!Helper.isEmpty(userData)) {
            this.updateAdminUser({
                id: userData.id, last_login_time: Helper.datetime()
            }).catch((err) => {
                Logger.Error(err);
            });
        }
        return userData;
    }

    /**
     *
     *
     * @param {string} username
     * @param {string} password
     * @param {boolean} [check=false]
     * @returns
     * @memberof PassportService
     */
    async getAdminUser(username: string, password: string, check = false) {
        const userData = await this.userModel.getUserInfoByName(username, password).catch((err: Error) => {
            throw Error("查询错误");
        });
        if (check) {
            if (Helper.isEmpty(userData)) {
                throw Error("用户名或密码错误");
            }
            //用户有效
            if (Helper.toNumber(userData.status) !== 1) {
                throw Error("用户被禁用");
            }
            //用户角色有效
            if (Helper.toNumber(userData.role_status) !== 1) {
                throw Error("用户角色被禁用");
            }
            //有效期
            if (Helper.toNumber(userData.roleid) !== this.superRole && Helper.toNumber(userData.end_time) < Helper.datetime()) {
                throw Error("用户已经过期失效");
            }
        }
        return userData;
    }

    /**
     * 新增后台用户
     *
     * @param {*} info
     * @returns
     * @memberof PassportService
     */
    async addAdminUser(info: any) {
        if (Helper.isEmpty(info.username)) {
            throw Error("手机号码和Email任选一个必填");
        }
        if (Helper.isEmpty(info.nickname)) {
            throw Error("昵称必填");
        }

        //检测到Email
        if (tool.email(info.username)) {
            const emailCheck = await this.userModel.where({ email: info.username }).count();
            if (emailCheck > 0) {
                throw Error("该Email已经被注册过");
            }
        }
        //检测到phonenum
        if (tool.mobile(info.username)) {
            const emailCheck = await this.userModel.where({ phonenum: info.username }).count();
            if (emailCheck > 0) {
                throw Error("该手机号码已经被注册过");
            }
        }
        //
        info.id = tool.uuid(32);
        const uid = await this.userModel.add(info);
        return info;
    }

    /**
     * 编辑后台用户
     *
     * @param {*} info
     * @returns
     * @memberof PassportService
     */
    async updateAdminUser(info: any) {
        if (Helper.isEmpty(info.id)) {
            throw Error("缺少用户ID");
        }
        const oldInfo = await this.userModel.getInfo(info.id);
        if (Helper.isEmpty(oldInfo)) {
            throw Error("用户不存在");
        }
        //检测到Email
        if (!Helper.isEmpty(info.email) && info.email !== oldInfo.email) {
            const emailCheck = await this.userModel.where({ email: info.email, id: { '!=': info.id } }).count();
            if (emailCheck > 0) {
                throw Error("该Email已经被注册过");
            }
        }
        //检测到phonenum
        if (!Helper.isEmpty(info.phonenum) && info.phonenum !== oldInfo.phonenum) {
            const emailCheck = await this.userModel.where({ phonenum: info.phonenum, id: { '!=': info.id } }).count();
            if (emailCheck > 0) {
                throw Error("该手机号码已经被注册过");
            }
        }
        return this.userModel.where({ id: info.id }).update(info);
    }
}