/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2020-05-10 14:55:44
 */
import { Service, Base, Autowired, Value, Koatty, Helper } from "koatty";
import { App } from '../../App';
import { CommonService } from "../CommonService";
import { UserModel } from "../../model/UserModel";
import { GroupModel } from '../../model/GroupModel';
import { RoleModel } from '../../model/RoleModel';

@Service()
export class UserService extends CommonService {
    app: App;
    @Autowired()
    Model: UserModel;
    @Autowired()
    groupModel: GroupModel;
    @Autowired()
    roleModel: RoleModel;

    init() {
        //property
    }

    /**
     * 获取用户组列表
     *
     * @returns
     * @memberof UserService
     */
    getGroupList() {
        return this.groupModel.field(['id', 'name', 'desc', 'icon']).where({ status: 1 }).select().catch((): any[] => []);
    }

    /**
     * 获取用户角色列表
     *
     * @returns
     * @memberof UserService
     */
    getRoleList() {
        return this.roleModel.field(['id', 'name', 'desc']).where({ status: 1 }).select().catch((): any[] => []);
    }

    /**
     * 个人修改资料
     *
     * @param {string} userid
     * @param {*} profile
     * @returns
     * @memberof UserService
     */
    async changeProfile(userid: string, profile: any) {
        if (Helper.isEmpty(userid)) {
            throw Error("userid丢失，必须先登录");
        }
        //修改手机号码,不能为已经存在的
        const mex = await this.Model.where({ id: { "!=": userid }, phonenum: profile.phonenum }).count().catch(() => 0);
        if (mex > 0) {
            throw Error("手机号码已经存在");
        }
        //修改email,不能为已经存在的
        const eex = await this.Model.where({ id: { "!=": userid }, email: profile.email }).count().catch(() => 0);
        if (eex > 0) {
            throw Error("手机号码已经存在");
        }
        return this.Model.where({ id: userid }).update(profile);
    }

    /**
     * 个人修改密码
     *
     * @param {string} userid
     * @param {string} password
     * @param {string} newPassword
     * @returns
     * @memberof UserService
     */
    async changePassword(userid: string, password: string, newPassword: string) {
        //判断原密码是否正确
        const mex = await this.Model.where({ id: userid, password: Helper.md5(password) }).count().catch(() => 0);
        if (mex < 1) {
            throw Error("原密码不正确");
        }

        return this.Model.where({ id: userid }).update({ password: newPassword });
    }
}