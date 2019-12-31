/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-12-12 09:48:17
 */
import { Controller, BaseController, Autowired, Logger, Helper } from "koatty";
import { App } from '../App';
import { CommonService } from '../service/CommonService';

@Controller()
export class AdminController extends BaseController {
    app: App;
    Mo = { rel: false, sortby: {}, field: <any>[], ispage: true, pagesize: 20, page: 1, model: "" };
    Map: any = {}; //保存查询条件
    Model: any = null; //定义模型类,用于判断数据权限

    @Autowired()
    protected commonService: CommonService;

    async __before() {
        //管理后台登录检查
        await this.checkLogin();
        const map = await this.commonService.authCheck(this.ctx.userid, this.ctx.path, this.Model ? this.Model.modelName : "", this.Map).catch((err) => {
            Logger.error(err);
            return this.fail("无权限访问", "", 403);
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
        const userid = this.ctx.userid || '';
        const ex = await this.app.cacheStore.get('UUID', userid).catch((err: any) => '');
        if (!ex) {
            return this.fail('请登录后访问', { needLogin: 1 }, 401);
        }
        return Promise.resolve();
    }

}
