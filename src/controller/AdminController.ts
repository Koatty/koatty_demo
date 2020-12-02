/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2020-05-12 00:03:30
 */
import { Controller, BaseController, Autowired, Logger, Helper, RequestParam } from "koatty";
import { App } from '../App';
import { CommonService } from '../service/CommonService';

@Controller()
export class AdminController extends BaseController {
    app: App;
    Mo = { rel: false, sortby: {}, field: <any>[], ispage: true, pagesize: 20, page: 1, model: "" };
    Map: any = {}; //保存查询条件
    // tslint:disable-next-line: no-null-keyword
    Model: any = null; //定义模型类,用于判断数据权限

    @Autowired()
    protected commonService: CommonService;

    async __before() {
        //管理后台登录检查
        await this.checkLogin();
        const map = await this.commonService.authCheck(this.ctx.userid, this.ctx.path, this.Model ? this.Model.modelName : "", this.Map).catch((err) => {
            Logger.Error(err);
            this.fail("无权限访问", "", 403);
            return this.prevent();
        });
        //定义只读属性,属性不能被覆盖删除
        // tslint:disable-next-line: forin
        for (const n in map) {
            Helper.define(this.Map, n, map[n]);
        }
    }

    /**
     * 检查登录
     *
     * @returns
     * @memberof AdminController
     */
    async checkLogin() {
        const token = this.ctx.get('x-access-token');
        const uuid = await this.ctx.jwtDecode(token).catch((err: any) => {
            this.fail(err.message, { needLogin: 1 }, 401);
            return this.prevent();
        });
        this.ctx.userid = uuid;
        if (this.app.cacheStore) {
            const ex = await this.app.cacheStore.get('UUID', uuid).catch((err: any) => '');
            if (!ex) {
                return this.fail('请登录后访问', { needLogin: 1 }, 401);
            }
        }

        return Promise.resolve();
    }

}
