/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-11-14 19:31:23
 */
import { Service, Base, Helper, Autowired, Value } from "koatty";
import { App } from '../../App';
import { UserModel } from "../../model/UserModel";
import { RoleRuleModel } from "../../model/RoleRuleModel";

/**
 * 如果所有下级菜单都为隐藏状态，该菜单默认为跳转功能，不再显示下级
 * 
 * @param {any} arr 
 * @returns 
 */
const loopSet = function (arr: any[]) {
    let flag = 1;
    if (Helper.isEmpty(arr)) {
        return flag;
    }
    arr.map((item: any) => {
        if (item.isshow === 1) {
            flag = 0;
        }
    });
    return flag;
};

@Service()
export class MenuService extends Base {
    app: App;
    @Autowired()
    private roleRuleModel: RoleRuleModel;
    @Autowired()
    private userModel: UserModel;
    private cache: any;
    @Value("rbac")
    private rbacConf: any;

    init() {
        //property
        this.cache = this.app.cacheStore;
    }

    /**
     *
     *
     * @param {string} userid
     * @param {boolean} [cache=true]
     * @returns
     * @memberof MenuService
     */
    async getAllMenu(userid: string, cache = true) {
        let list: any[] = [];
        const userInfo = await this.userModel.getInfo(userid);
        if (Helper.isEmpty(userInfo) || Helper.isEmpty(userInfo.roleid)) {
            return list;
        }
        if (cache) {
            const cacheList = await this.cache.hget('ROLE_MENUS', userInfo.roleid);
            list = JSON.parse(cacheList);
        }
        if (Helper.isEmpty(list)) {
            const ps: any[] = [];
            const menuList = await this.getFirstMenu(userInfo).catch((e) => []);
            menuList.map((item) => {
                ps.push(this.getSubMenu(userInfo, item.id).then((sub) => {
                    item.children = sub;
                    item.goto = loopSet(sub);
                    return item;
                }));
            });
            list = await Promise.all(ps);
            this.cache.hset('ROLE_MENUS', userInfo.roleid, JSON.stringify(list));
        }
        return list;
    }

    /**
     *
     *
     * @param {*} userInfo
     * @param {string} [menuid]
     * @returns {Promise<any[]>}
     * @memberof MenuService
     */
    async getFirstMenu(userInfo: any, menuid?: string): Promise<any[]> {
        const condition: any = {
            status: 1,
            level: 1
        };
        const option = {
            //'listorders desc, id asc'
            listorders: 'desc',
            id: 'asc'
        };
        if (userInfo.rule_ids && this.rbacConf.auth_superrole !== userInfo.roleid) {
            const ruleIds = Helper.isArray(userInfo.rule_ids) ? userInfo.rule_ids : userInfo.rule_ids.split(',');
            condition.id = ruleIds;
        }
        const list = await this.roleRuleModel.field('id,desc,name,icon,level,pid').where(condition).order(option).select();
        if (!Helper.isEmpty(menuid)) {
            return list.filter((x: any) => x.id === Helper.toInt(menuid));
        } else {
            return list;
        }
    }

    /**
     *
     *
     * @param {*} userInfo
     * @param {*} pid
     * @returns {Promise<any[]>}
     * @memberof MenuService
     */
    async getSubMenu(userInfo: any, pid: any): Promise<any[]> {
        const condition: any = { //二级菜单
            pid,
            status: 1
        };
        const option = {
            //'listorders desc, id desc'
            listorders: 'desc',
            id: 'asc'
        };

        if (userInfo.rule_ids && this.rbacConf.auth_superrole !== userInfo.roleid) {
            const ruleIds = Helper.isArray(userInfo.rule_ids) ? userInfo.rule_ids : userInfo.rule_ids.split(',');
            condition.id = ruleIds;
        }

        const ps: any[] = [];
        let list = await this.roleRuleModel.field('id,desc,name,icon,level,pid').where(condition).order(option).select().catch(() => { });
        list = list || [];
        list.map((item: any) => {
            condition.pid = item.id;
            ps.push(this.roleRuleModel.where(condition).count().then((num: number) => {
                if (num > 0) {
                    return this.getSubMenu(userInfo, item.id);
                } else {
                    return Promise.resolve([]);
                }
            }).then((subList: any[]) => {
                item.children = subList;
                item.goto = loopSet(subList);
                return item;
            }));
        });
        return Promise.all(ps);
    }
}