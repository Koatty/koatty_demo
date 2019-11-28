/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-11-28 14:23:15
 */
import { Service, Base, Autowired, Value, Koatty } from "koatty";
import { App } from '../App';
import { CommonService } from "./CommonService";
import { UserModel } from "../model/UserModel";
import { GroupModel } from '../model/GroupModel';
import { RoleModel } from '../model/RoleModel';

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
}