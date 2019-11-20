/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-11-19 09:51:20
 */
import { Controller, BaseController, Autowired, Logger } from "koatty";
import { App } from '../App';
import { CommonService } from '../service/CommonService';

@Controller()
export class AdminController extends BaseController {
    app: App;
    Mo: { rel: false; sortby: any; field: any[]; ispage: boolean; pagesize: number; page: number; };
    Map: any; //保存查询条件
    Model: any; //定义模型类,用于判断数据权限

    @Autowired()
    protected commonService: CommonService;

    init() {
        this.Model = null;
        this.Mo = { rel: false, sortby: {}, field: [], ispage: true, pagesize: 20, page: 1 };
        this.Map = {};
    }

    __empty() {
        return this.fail('没有权限访问', {}, 404);
    }

    async __before() {
        //管理后台登录检查
        await this.checkLogin();
        this.Map = await this.commonService.authCheck(this.ctx.userid, this.ctx.path, this.Model ? this.Model.modelName : "", this.Map).catch((err) => {
            Logger.error(err);
            return this.fail("无权限访问", "", 403);
        });
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
            return this.fail('请登录后访问', { needLogin: 1 });
        }
        return Promise.resolve();
    }

}