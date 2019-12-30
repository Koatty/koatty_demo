/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-12-23 13:45:56
 */
// tslint:disable-next-line: no-implicit-dependencies
import * as globby from 'globby';
import { Controller, GetMaping, Get, Autowired, Post, PostMaping, Valid } from "koatty";
import { App } from '../../App';
import { AdminController } from "../AdminController";
import { DataService } from "../../service/Admin/DataService";

@Controller("/admin/data")
export class DataController extends AdminController {
    app: App;
    @Autowired()
    service: DataService;

    /**
    * @api {get} /admin/data/index 数据权限列表
    * @apiGroup Data
    *
    * @apiHeader {String} x-access-token JWT token
    *
    * @apiParam {String} [page]  当前页码.
    * @apiParam {String} [condition]  检索条件.
    *
    * @apiSuccessExample {json} Success
    * {"status":1,"code":200,"message":"操作成功","data":{"count":0,"total":0,"page":0,"num":20,"data":[]}}
    *
    * @apiSuccess {Number} count 总条数
    * @apiSuccess {Number} total 总页数
    * @apiSuccess {Number} page 当前页码
    * @apiSuccess {Number} num 每页条数
    * @apiSuccess {json} data 列表数据
    *
    * @apiErrorExample {json} Error
    * {"status":0,"code":500,"message":"错误信息","data":{}}
    */
    @GetMaping("/")
    @GetMaping("/index")
    async index(@Get("condition") param: any, @Get("page") page: number) {
        this.Map = param;
        this.Mo.page = page || 1;

        const pageData = await this.service.list(this.Map, this.Mo).catch((err: any) => {
            return this.fail(`操作失败! ${err.message || err}`);
        });
        return this.ok("查询成功", pageData);
    }

    /**
    * @api {get} /admin/data/models 模型名列表
    * @apiGroup Data
    * 
    * @apiHeader {String} x-access-token JWT token
    * 
    * 
    * @apiSuccessExample {json} Success
    * {"status":1,"code":200,"message":"","data":{modelList: []}}
    * 
    * @apiSuccess {array} modelList 模型名列表 {"modelList":[""]}
    *
    * @apiErrorExample {json} Error
    * {"status":0,"code":500,"message":"错误信息","data":{}}
    */
    @GetMaping("/models")
    async getModels() {
        const fileResults = globby.sync(['**/**.js', '**/**.ts', '!**/**.d.ts'], {
            cwd: `${this.app.app_path}/model`,
            ignore: []
        });
        const modelList: string[] = [];
        fileResults.map((item: string) => {
            modelList.push(item.replace("Model.ts", "").replace("Model.js", ""));
        });
        return this.ok("", { modelList });
    }
    /**
    * @api {post} /admin/data/add 数据权限新增
    * @apiGroup Data
    *
    * @apiHeader {String} x-access-token JWT token
    *
    * @apiParam {String} name 数据模型类名称
    * @apiParam {String} desc 数据规则描述
    * @apiParam {String} [condition] 数据筛选条件
    *
    * @apiSuccessExample {json} Success
    * {"status":1,"code":200,"message":"操作成功","data":{}}
    *
    * @apiSuccess {json} modelList 编辑页面显示需要的模型名列表 {"modelList":["group","role","role_data","role_rule","user"]}
    *
    * @apiErrorExample {json} Error
    * {"status":0,"code":500,"message":"操作失败","data":{}}
    */
    @PostMaping("/add")
    async add(@Post("name") @Valid("notEmpty", "数据模型类名称不能为空") name: string, @Post("desc") @Valid("notEmpty", "数据规则描述不能为空") desc: string, @Post("condition") condition: any) {
        const res = await this.service.add({ name, desc, condition }).catch((err: any) => {
            return this.fail(`操作失败! ${err.message || err}`);
        });
        return this.ok("操作成功", res);
    }

    /**
    * @api {post} /admin/data/edit 数据权限编辑
    * @apiGroup Data
    * 
    * @apiHeader {String} x-access-token JWT token
    * 
    * @apiParam {String} id 规则ID.
    * @apiParam {String} [name] 数据模型类名称
    * @apiParam {String} [desc] 数据规则描述
    * @apiParam {String} [condition] 数据筛选条件
    * 
    * @apiSuccessExample {json} Success
    * {"status":1,"code":200,"message":"","data":{}}
    * 
    * @apiErrorExample {json} Error
    * {"status":0,"code":500,"message":"错误信息","data":{}}
    */
    @PostMaping("/edit")
    async edit(@Post("id") @Valid("notEmpty", "规则ID不能为空") id: number,
        @Post("name") @Valid("notEmpty", "规则模型类名称不能为空") name: string,
        @Post("desc") @Valid("notEmpty", "数据规则描述不能为空") desc: string,
        @Post("condition") condition: any) {
        const res = await this.service.edit(this.Map, { id, name, desc, condition }).catch((err: any) => {
            return this.fail(`操作失败! ${err.message || err}`);
        });
        return this.ok("操作成功", res);
    }

    /**
    * @api {post} /admin/data/del 数据权限删除
    * @apiGroup Data
    *
    * @apiHeader {String} x-access-token JWT token
    *
    * @apiParam {String} id  权限ID，可以为多个: 1,2,3.
    *
    * @apiSuccessExample {json} Success
    * {"status":1,"code":200,"message":"操作成功","data":{}}
    *
    * @apiErrorExample {json} Error
    * {"status":0,"code":500,"message":"操作失败","data":{}}
    */
    @PostMaping("/del")
    async del(@Post("id") param: number) {
        const res = await this.service.del(this.Map, param).catch((err: any) => {
            return this.fail(`操作失败! ${err.message || err}`);
        });
        return this.ok("操作成功", res);
    }

    /**
    * @api {get} /admin/data/view 数据权限查看
    * @apiGroup Data
    * 
    * @apiHeader {String} x-access-token JWT token
    * 
    * @apiParam {String} id  权限ID，可以为多个: 1,2,3.
    * 
    * @apiSuccessExample {json} Success
    * {"status":1,"code":200,"message":"","data":{}}
    * 
    * @apiErrorExample {json} Error
    * {"status":0,"code":500,"message":"错误信息","data":{}}
    */
    @GetMaping("/view")
    async view(@Get("id") param: number) {
        const res = await this.service.info(this.Map, param).catch((err: any) => {
            return this.fail(`操作失败! ${err.message || err}`);
        });
        return this.ok("操作成功", res);
    }

}
