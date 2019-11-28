/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-11-14 19:31:27
 */
import { Service, Base, Autowired, Helper, Value, Logger } from "koatty";
import { App } from '../../App';
import { UserModel } from '../../model/UserModel';
import * as tool from "../../util/tool";

@Service()
export class PassportService extends Base {
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
                Logger.error(err);
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
        const userData = await this.userModel.getUserInfoByName(username, password);
        if (check) {
            if (Helper.isEmpty(userData)) {
                return Promise.reject("用户名或密码错误");
            }
            //用户有效
            if (Helper.toNumber(userData.status) !== 1) {
                return Promise.reject("用户被禁用");
            }
            //用户角色有效
            if (Helper.toNumber(userData.role_status) !== 1) {
                return Promise.reject("用户角色被禁用");
            }
            //有效期
            if (Helper.toNumber(userData.roleid) !== this.superRole && Helper.toNumber(userData.end_time) < Helper.datetime()) {
                return Promise.reject("用户已经过期失效");
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
            return Promise.reject("手机号码和Email任选一个必填");
        }
        if (Helper.isEmpty(info.nickname)) {
            return Promise.reject("昵称必填");
        }

        //检测到Email
        if (tool.email(info.username)) {
            const emailCheck = await this.userModel.where({ email: info.username }).count();
            if (emailCheck > 0) {
                return Promise.reject("该Email已经被注册过");
            }
        }
        //检测到phonenum
        if (tool.mobile(info.username)) {
            const emailCheck = await this.userModel.where({ phonenum: info.username }).count();
            if (emailCheck > 0) {
                return Promise.reject("该手机号码已经被注册过");
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
            return Promise.reject("缺少用户ID");
        }
        const oldInfo = await this.userModel.getInfo(info.id);
        if (Helper.isEmpty(oldInfo)) {
            return Promise.reject("用户不存在");
        }
        //检测到Email
        if (!Helper.isEmpty(info.email) && info.email !== oldInfo.email) {
            const emailCheck = await this.userModel.where({ email: info.email, id: { '!=': info.id } }).count();
            if (emailCheck > 0) {
                return Promise.reject("该Email已经被注册过");
            }
        }
        //检测到phonenum
        if (!Helper.isEmpty(info.phonenum) && info.phonenum !== oldInfo.phonenum) {
            const emailCheck = await this.userModel.where({ phonenum: info.phonenum, id: { '!=': info.id } }).count();
            if (emailCheck > 0) {
                return Promise.reject("该手机号码已经被注册过");
            }
        }
        return this.userModel.where({ id: info.id }).update(info);
    }
}