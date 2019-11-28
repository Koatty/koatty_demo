/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-11-28 14:26:51
 */
import { Controller, GetMaping, Autowired, Get, PostMaping, Post } from "koatty";
import { App } from '../../App';
import { AdminController } from "../AdminController";
import { UserService } from "../../service/UserService";

@Controller("/admin/user")
export class UserController extends AdminController {
    app: App;
    @Autowired()
    service: UserService;

    /**
    * @api {get} /admin/user/index 用户列表
    * @apiGroup User
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
    * @api {post} /admin/user/add 用户新增
    * @apiGroup User
    *
    * @apiHeader {String} x-access-token JWT token
    *
    * @apiParam {String} [openid] 预留第三方登录ID
    * @apiParam {String} phonenum 手机号（登录账号）
    * @apiParam {String} password 登录密码
    * @apiParam {String} email 用户email（登录账号）
    * @apiParam {String} [nickname] 用户昵称
    * @apiParam {String} [realname] 姓名
    * @apiParam {String} [icon] 用户头像
    * @apiParam {String} [birthday] 用户生日 2018-01-01
    * @apiParam {String} [gender] 用户性别0女1男2不确定
    * @apiParam {String} [website] 用户网站
    * @apiParam {String} [remark] 用户简介
    * @apiParam {String} [end_time] 到期时间 2019-01-01
    * @apiParam {String} roleid 角色ID
    * @apiParam {String} groupid 组织ID
    *
    * @apiSuccessExample {json} Success
    * {"status":1,"code":200,"message":"操作成功","data":{}}
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
    * @api {get} /admin/user/groupList 用户组列表
    * @apiGroup User
    * 
    * @apiHeader {String} x-access-token JWT token
    * 
    * 
    * @apiSuccessExample {json} Success
    * {"status":1,"code":200,"message":"","data":[{}]}
    * 
    * @apiErrorExample {json} Error
    * {"status":0,"code":500,"message":"错误信息","data":[{}]}
    */
    @GetMaping("/groupList")
    async groupList() {
        const list = await this.service.getGroupList();
        return this.ok("", list);
    }

    /**
    * @api {get} /admin/user/roleList 用户角色列表
    * @apiGroup User
    *
    * @apiHeader {String} x-access-token JWT token
    *
    *
    * @apiSuccessExample {json} Success
    * {"status":1,"code":200,"message":"","data":[{}]}
    *
    * @apiErrorExample {json} Error
    * {"status":0,"code":500,"message":"错误信息","data":[{}]}
    */
    @GetMaping("/roleList")
    async roleList() {
        const list = await this.service.getRoleList();
        return this.ok("", list);
    }

    /**
    * @api {post} /admin/user/edit 用户编辑
    * @apiGroup User
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
    async edit(@Post() param: any) {
        const res = await this.service.edit(this.Map, param).catch((err: any) => {
            return this.fail(`操作失败! ${err.message || err}`);
        });
        return this.ok("操作成功", res);
    }

    /**
    * @api {post} /admin/user/del 用户删除
    * @apiGroup User
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
    * @api {get} /admin/user/view 用户查看
    * @apiGroup User
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
