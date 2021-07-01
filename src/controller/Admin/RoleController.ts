/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-12-31 12:00:34
 */
import { Controller, GetMapping, Get, Autowired, PostMapping, Post, Helper, prevent } from "koatty";
import { Valid, Validated } from 'koatty_validation';
import { App } from '../../App';
import { AdminController } from '../AdminController';
import { RoleService } from '../../service/Admin/RoleService';
import { MenuService } from '../../service/Admin/MenuService';
import { RbacService } from '../../service/Admin/RbacService';
import { RoleDTO } from '../../dto/RoleDTO';

@Controller("/admin/role")
export class RoleController extends AdminController {
    app: App;
    @Autowired()
    service: RoleService;
    @Autowired()
    menuService: MenuService;
    @Autowired()
    rbacService: RbacService;
    private cache: any;

    init() {
        //...
        this.cache = this.app.cacheStore;
    }

    /**
    * @api {get} /admin/role/index 角色列表
    * @apiGroup Role
    *
    * @apiHeader {String} x-access-token JWT token
    *
    * @apiParamClass (src/dto/RoleDTO.ts) {RoleDTO}
    *
    * @apiSuccessExample {json} Success
    * {"status":1,"code":200,"message":"","data":{}}
    *
    * @apiErrorExample {json} Error
    * {"status":0,"code":500,"message":"错误信息","data":{}}
    */
    @GetMapping("/")
    @GetMapping("/index")
    @Validated()
    async index(@Get() param: RoleDTO) {
        this.Mo.page = param.page || 1;
        this.Map = { ...this.Map, ...param };
        // tslint:disable-next-line: no-unused-expression
        this.Map.page && (delete this.Map.page);

        const pageData = await this.service.list(this.Map, this.Mo).catch((err: any) => {
            this.fail(`操作失败! ${err.message || err}`);
            return prevent();
        });
        return this.ok("查询成功", pageData);
    }

    /**
    * @api {post} /admin/role/add 角色新增
    * @apiGroup Role
    *
    * @apiHeader {String} x-access-token JWT token
    *
    * @apiParam {String} name 角色名称
    * @apiParam {String} desc 角色描述
    * @apiParam {String} [ext] 扩展信息
    *
    * @apiSuccessExample {json} Success
    * {"status":1,"code":200,"message":"操作成功","data":{}}
    *
    * @apiErrorExample {json} Error
    * {"status":0,"code":500,"message":"操作失败","data":{}}
    */
    @PostMapping("/add")
    async add(@Post() param: any) {
        const res = await this.service.add(param).catch((err: any) => {
            this.fail(`操作失败! ${err.message || err}`);
            return prevent();
        });
        return this.ok("操作成功", res);
    }

    /**
    * @api {post} /admin/role/edit 角色编辑
    * @apiGroup Role
    *
    * @apiHeader {String} x-access-token JWT token
    *
    * @apiParam {String} id  角色ID.
    * @apiParam {String} name 角色名称
    * @apiParam {String} desc 角色描述
    * @apiParam {String} [ext] 扩展信息
    * @apiParam {String} [rule_ids] 角色功能权限1,2,3
    * @apiParam {String} [data_ids] 角色数据权限1,2,3
    *
    * @apiSuccessExample {json} Success
    * {"status":1,"code":200,"message":"成功信息","data":{}}
    *
    * @apiErrorExample {json} Error
    * {"status":0,"code":500,"message":"错误信息","data":{}}
    */
    @PostMapping("/edit")
    async edit(@Post() param: any) {
        const res = await this.service.edit(this.Map, param).catch((err: any) => {
            this.fail(`操作失败! ${err.message || err}`);
            return prevent();
        });
        return this.ok("操作成功", res);
    }

    /**
    * @api {post} /admin/role/del 角色删除
    * @apiGroup Role
    *
    * @apiHeader {String} x-access-token JWT token
    *
    * @apiParam {String} id  角色ID.
    *
    * @apiSuccessExample {json} Success
    * {"status":1,"code":200,"message":"成功信息","data":{}}
    *
    * @apiErrorExample {json} Error
    * {"status":0,"code":500,"message":"错误信息","data":{}}
    */
    @PostMapping("/del")
    async del(@Post("id") param: number) {
        const res = await this.service.del(this.Map, param).catch((err: any) => {
            this.fail(`操作失败! ${err.message || err}`);
            return prevent();
        });
        return this.ok("操作成功", res);
    }

    /**
    * @api {get} /admin/role/rule 功能权限列表
    * @apiGroup Role
    *
    * @apiHeader {String} x-access-token JWT token
    *
    * @apiSuccessExample {json} Success
    * {"status":1,"code":200,"message":"","data":{"ruleList":[{"id":2,"desc":"权限管理","name":"","icon":"","level":2,"pid":1,"children":[{"id":3,"desc":"规则管理","name":"","icon":"","level":3,"pid":2,"children":[],"goto":1}]}}
    *
    * @apiErrorExample {json} Error
    * {"status":0,"code":500,"message":"错误信息","data":{}}
    */
    @GetMapping("/ruleList")
    async ruleList() {
        try {
            let all: any[] = [];
            const menuList = await this.menuService.getAllMenu(this.ctx.userid).catch(() => []);
            const func = function (datas: any[], arr: any[]) {
                datas.forEach((v) => {
                    arr.push(v);
                    if (!Helper.isEmpty(v.children)) {
                        func(v.children, arr);
                    }
                });
            };
            func(menuList, all);

            //去除高层重复规则 level>1的
            all = all.filter((item) => item.level > 1);
            return this.ok('', { ruleList: all });
        } catch (e) {
            return this.fail('获取失败');
        }
    }

    /**
    * @api {get} /admin/role/dataList 数据权限列表
    * @apiGroup Role
    *
    * @apiHeader {String} x-access-token JWT token
    *
    * @apiSuccessExample {json} Success
    * {"status":1,"code":200,"message":"","data":{"user":"","group":""}}
    *
    * @apiErrorExample {json} Error
    * {"status":0,"code":500,"message":"错误信息","data":{}}
    */
    @GetMapping("/dataList")
    async dataList() {
        try {
            let userInfo = this.cache.hget("UserInfo", this.ctx.userid);
            userInfo = JSON.parse(userInfo);
            if (Helper.isEmpty(userInfo)) {
                return this.ok("", []);
            }
            const datas = await this.rbacService.getDataList(userInfo);
            return this.ok('', datas);
        } catch (e) {
            return this.fail('获取失败');
        }
    }
}
