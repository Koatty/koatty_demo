/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2020-05-10 14:55:18
 */
import { Service, Value, Autowired, Logger, Helper, BaseService } from "koatty";
import { App } from '../App';
import { RbacService } from "./Admin/RbacService";
import * as page from "../util/page";

export interface MoInterface { rel: boolean; sortby: any; field: any[]; ispage: boolean; pagesize: number; page: number; }

@Service()
export class CommonService extends BaseService {
    app: App;

    @Value("rbac")
    private rbacConf: any;
    @Autowired()
    private rbacService: RbacService;
    protected Model: any;


    /**
     * 功能及数据权限检查
     *
     * @param {string} userid
     * @param {string} path
     * @param {string} modelName
     * @param {*} map
     * @returns
     * @memberof CommonService
     */
    async authCheck(userid: string, path: string, modelName: string, map: any) {
        //检查功能权限
        if (this.rbacConf.enable_rule) {
            const flag = await this.rbacService.ruleAuth(path, userid);
            if (!flag) {
                throw Error("无权限访问");
            }
        }
        //获取数据权限
        if (this.rbacConf.enable_data) {
            map = await this.rbacService.dataAuth(userid, modelName, map);
        }
        return map;
    }

    /**
     * 列表查询
     *
     * @param {*} map
     * @param {MoInterface} mo
     * @param {*} [model]
     * @returns
     * @memberof CommonService
     */
    list(map: any, mo: MoInterface, model?: any) {
        model = model || this.Model;
        if (mo.ispage) {
            return page.list(model, map, mo).catch((err) => {
                Logger.Error(err);
                return {};
            });
        } else {
            return page.list(model, map, mo).catch((err) => {
                Logger.Error(err);
                return [];
            });
        }
    }

    /**
     * 查询
     *
     * @param {*} map
     * @param {*} id
     * @param {*} [model]
     * @returns
     * @memberof CommonService
     */
    async info(map: any, id: any, model?: any) {
        model = model || this.Model;
        const pk = await model.getPk();
        if (Helper.isEmpty(id)) {
            throw Error(`id不能为空`);
        }
        map[pk] = id;
        return model.where(map).find();
    }

    /**
     * 新增
     *
     * @param {*} data
     * @param {*} [model]
     * @returns
     * @memberof CommonService
     */
    async add(data: any, model?: any) {
        model = model || this.Model;
        return model.add(data).catch((e: any) => Promise.reject(e.message));
    }

    /**
     * 编辑
     *
     * @param {*} map
     * @param {*} data
     * @param {*} [model]
     * @returns
     * @memberof CommonService
     */
    async edit(map: any, data: any, model?: any) {
        model = model || this.Model;
        const pk = await model.getPk();
        if (Helper.isEmpty(data[pk])) {
            throw Error(`${pk}不能为空`);
        }
        map[pk] = data[pk];
        return model.where(map).update(data);
    }

    /**
     * 删除
     *
     * @param {*} map
     * @param {*} id
     * @param {*} [model]
     * @returns
     * @memberof CommonService
     */
    async del(map: any, id: any, model?: any) {
        model = model || this.Model;
        const pk = await model.getPk();
        if (Helper.isEmpty(id)) {
            throw Error(`id不能为空`);
        }
        map[pk] = id;
        return model.where(map).delete();
    }


}