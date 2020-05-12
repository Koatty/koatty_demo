/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2020-05-12 17:23:30
 */
import { Controller, BaseController, GetMapping, Post, Autowired, Helper, Value, PostMapping, Get, Valid, PutMapping, RequestBody, PathVariable } from "koatty";
import { App } from '../../App';
const jwt = require('jsonwebtoken');
import { PassportService } from "../../service/Admin/PassportService";

@Controller("/admin/public")
export class PublicController extends BaseController {
    app: App;
    pageInfo: { 'appName': string; 'appVersion': string; 'appKeywords': string; 'appDescription': string };
    @Value("config.JwtMiddleware", "middleware")
    tokenConf: any;

    @Autowired()
    private passportService: PassportService;

    cache: any;

    init() {
        this.cache = this.app.cacheStore;
    }

    __before() {
        this.pageInfo = {
            'appName': this.app.config('app_title'),
            'appVersion': this.app.config('app_version'),
            'appKeywords': this.app.config('app_keywords'),
            'appDescription': this.app.config('app_description')
        };
        return Promise.resolve();
    }

    /**
    * @api {post} /admin/public/login 登录
    * @apiGroup Admin
    * 
    * @apiParam {String} username  用户名，手机号或email.
    * @apiParam {String} password  密码.
    * 
    * @apiSuccessExample {json} Success
    * {"status":1,"code":200,"message":"","data":{"accessToken": "", "userInfo": {"userid": "", "roleid": "", "openid": "","nickname":"","icon":""},"pageInfo": {}}}
    * @apiSuccess {String} accessToken token
    * @apiSuccess {String} userInfo.userid 用户ID
    * @apiSuccess {String} userInfo.roleid 角色ID
    * @apiSuccess {String} userInfo.nickname 昵称
    * @apiSuccess {String} userInfo.icon 头像
    * @apiSuccess {String} pageInfo 网页标题、描述等信息
    * 
    * @apiErrorExample {json} Error
    * {"status":0,"code":500,"message":"错误信息","data":{}}
    */
    @PostMapping("/login")
    async login(@Post() info: any) {
        if (Helper.isEmpty(info) || Helper.isEmpty(info.username)) {
            return this.fail("用户名或密码错误");
        }
        const userData = await this.passportService.getAdminUser(info.username || '', Helper.toString(info.password) || '').catch((err) => {
            return this.fail(err.message);
        });
        if (Helper.isEmpty(userData) || Helper.isEmpty(userData.id)) {
            return this.fail("用户名或密码错误");
        }

        const timeout = this.tokenConf.exp || 3600;
        const token = jwt.sign({
            exp: Helper.datetime() + timeout,
            iss: userData.id,
            rid: userData.roleid
        }, this.tokenConf.key || '', { algorithm: this.tokenConf.alg });

        //登录标记
        this.cache.set('UUID', userData.id, timeout).catch((err: any) => '');
        const userInfo = {
            userid: userData.id,
            roleid: userData.roleid,
            openid: userData.openid,
            nickname: userData.nickname,
            icon: userData.icon
        };
        //用户信息
        this.cache.hset('UserInfo', userData.id, JSON.stringify(userInfo));

        return this.ok("登录成功", {
            accessToken: token, userInfo,
            pageInfo: this.pageInfo
        });
    }

    /**
    * @api {get} /admin/public/logout 登出
    * @apiGroup Admin
    * 
    * @apiHeader {String} x-access-token JWT token
    * 
    * 
    * @apiSuccessExample {json} Success
    * {"status":1,"code":200,"message":"","data":{}}
    * 
    * @apiErrorExample {json} Error
    * {"status":0,"code":500,"message":"错误信息","data":{}}
    */
    @GetMapping("/logout")
    async logout() {
        if (Helper.isEmpty(this.ctx.userid) || Helper.isEmpty(this.ctx.roleid)) {
            return this.fail('请重新登陆', { needLogin: 1 }, 403);
        }
        await Promise.all([
            //清除菜单缓存
            this.cache.hdel('ROLE_MENUS', this.ctx.roleid),
            //清除权限缓存
            this.cache.hdel('ROLE_RULES', this.ctx.roleid)
        ]).catch(() => {
            return this.fail("登出失败", { needLogin: 1 });
        });
        return this.ok("登出成功");
    }
}
