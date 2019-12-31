/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-12-31 11:27:40
 */
import { Controller, BaseController, GetMaping, Autowired, Get, PostMaping, Post, Helper, Validated } from "koatty";
import { App } from '../../App';
import { AdminController } from "../AdminController";
import * as groupType from "../../config/groupType.json";
import { GroupService } from '../../service/Admin/GroupService';
import { GroupDTO } from "../../model/dto/GroupDTO";

@Controller("/admin/group")
export class GroupController extends AdminController {
    app: App;
    @Autowired()
    service: GroupService;

    /**
    * @api {get} /admin/group/index 组织列表
    * @apiGroup Group
    *
    * @apiHeader {String} x-access-token JWT token
    *
    * @apiParamClass (src/model/dto/GroupDTO.ts) {GroupDTO}
    *
    * @apiSuccessExample {json} Success
    * {"status":1,"code":200,"message":"操作成功","data":{"count":1,"total":1,"page":1,"num":20,"data":[{"id":1,"name":"公司","icon":"","desc":"公司","address":"","phone":"","email":"","attribute":"","type":0,"create_time":1111,"update_time":1111,"status":1}]}}
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
    @Validated()
    async index(@Get() param: GroupDTO) {
        this.Mo.page = param.page || 1;
        this.Map = { ...this.Map, ...param };
        // tslint:disable-next-line: no-unused-expression
        this.Map.page && (delete this.Map.page);

        const pageData = await this.service.list(this.Map, this.Mo).catch((err: any) => {
            return this.fail(`操作失败! ${err.message || err}`);
        });
        return this.ok("查询成功", pageData);
    }

    /**
    * @api {get} /admin/data/groups 组织类型列表
    * @apiGroup Group
    * 
    * @apiHeader {String} x-access-token JWT token
    * 
    * 
    * @apiSuccessExample {json} Success
    * {"status":1,"code":200,"message":"","data":{groupType: []}}
    * 
    * @apiSuccess {array} groupType 组织类型列表 {"groupType":[""]}
    *
    * @apiErrorExample {json} Error
    * {"status":0,"code":500,"message":"错误信息","data":{}}
    */
    @GetMaping("/groups")
    async getGroups() {
        return this.ok("", { groupType });
    }

    /**
    * @api {post} /admin/group/add 组织新增
    * @apiGroup Group
    *
    * @apiHeader {String} x-access-token JWT token
    *
    * @apiParam {String} name 组织名称
    * @apiParam {String} desc 组织描述
    * @apiParam {String} type 组织类型
    * @apiParam {String} [icon] 组织图标
    * @apiParam {String} [address] 组织地址
    * @apiParam {String} [phone] 组织电话
    * @apiParam {String} [email] 组织email
    * @apiParam {String} [attribute] 组织标签
    *
    * @apiSuccessExample {json} Success
    * {"status":1,"code":200,"message":"操作成功","data":{}}
    *
    * @apiSuccess {json} groupTypes 新增页面组织类型列表 {"groupTypes":[{"group_code":1,"group_name":"公司"}]}
    *
    * @apiErrorExample {json} Error
    * {"status":0,"code":500,"message":"操作失败","data":{}}
    */
    @PostMaping("/add")
    async add(@Post() param: any) {
        const res = await this.service.add(param).catch((err: any) => {
            return this.fail(`操作失败! ${err.message || err}`);
        });
        return this.ok("操作成功", res);
    }

    /**
    * @api {post} /admin/group/edit 组织编辑
    * @apiGroup Group
    *
    * @apiHeader {String} x-access-token JWT token
    *
    * @apiParam {String} id  组织ID.
    * @apiParam {String} [name] 组织名称
    * @apiParam {String} [desc] 组织描述
    * @apiParam {String} [type] 组织类型
    * @apiParam {String} [icon] 组织图标
    * @apiParam {String} [address] 组织地址
    * @apiParam {String} [phone] 组织电话
    * @apiParam {String} [email] 组织email
    * @apiParam {String} [attribute] 组织标签
    *
    * @apiSuccessExample {json} Success
    * {"status":1,"code":200,"message":"操作成功","data":{}}
    *
    * @apiSuccess {json} groupTypes 新增页面组织类型列表 {"groupTypes":[{"group_code":1,"group_name":"公司"}]}
    *
    * @apiErrorExample {json} Error
    * {"status":0,"code":500,"message":"操作失败","data":{}}
    */
    @PostMaping("/edit")
    async edit(@Post() param: any) {
        const res = await this.service.edit(this.Map, param).catch((err: any) => {
            return this.fail(`操作失败! ${err.message || err}`);
        });
        return this.ok("操作成功", res);
    }

    /**
    * @api {post} /admin/group/del 组织删除
    * @apiGroup Group
    *
    * @apiHeader {String} x-access-token JWT token
    *
    * @apiParam {String} id  组织ID.
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
