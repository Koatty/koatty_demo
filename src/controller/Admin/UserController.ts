/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-12-31 12:00:23
 */
import { Controller, GetMapping, Autowired, Get, PostMapping, Post, Helper, Validated } from "koatty";
import { App } from '../../App';
import { AdminController } from "../AdminController";
import { UserService } from "../../service/Admin/UserService";
import { UserDTO } from "../../dto/UserDTO";

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
    * @apiParamClass (src/dto/UserDTO.ts) {UserDTO}
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
    @GetMapping("/")
    @GetMapping("/index")
    @Validated()
    async index(@Get() param: UserDTO) {
        this.Mo.page = param.page || 1;
        this.Map = { ...this.Map, ...param };
        // tslint:disable-next-line: no-unused-expression
        this.Map.page && (delete this.Map.page);

        const pageData = await this.service.list(this.Map, this.Mo).catch((err: any) => {
            this.fail(`操作失败! ${err.message || err}`);
            return this.prevent();
        });
        return this.ok("查询成功", pageData);
    }

    /**
    * @api {post} /admin/user/add 用户新增
    * @apiGroup User
    *
    * @apiHeader {String} x-access-token JWT token
    *
    * @apiParamClass (src/dto/UserDTO.ts) {UserDTO}
    *
    * @apiSuccessExample {json} Success
    * {"status":1,"code":200,"message":"操作成功","data":{}}
    * 
    * @apiErrorExample {json} Error
    * {"status":0,"code":500,"message":"操作失败","data":{}}
    */
    @PostMapping("/add")
    @Validated()
    async add(@Post() param: UserDTO) {
        const res = await this.service.add(param).catch((err: any) => {
            this.fail(`操作失败! ${err.message || err}`);
            return this.prevent();
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
    @GetMapping("/groupList")
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
    @GetMapping("/roleList")
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
    @PostMapping("/edit")
    async edit(@Post() param: any) {
        const res = await this.service.edit(this.Map, param).catch((err: any) => {
            this.fail(`操作失败! ${err.message || err}`);
            return this.prevent();
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
    @PostMapping("/del")
    async del(@Post("id") param: number) {
        const res = await this.service.del(this.Map, param).catch((err: any) => {
            this.fail(`操作失败! ${err.message || err}`);
            return this.prevent();
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
    @GetMapping("/view")
    async view(@Get("id") param: number) {
        const res = await this.service.info(this.Map, param).catch((err: any) => {
            this.fail(`操作失败! ${err.message || err}`);
            return this.prevent();
        });
        return this.ok("操作成功", res);
    }
}
