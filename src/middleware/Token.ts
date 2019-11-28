/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-11-28 17:10:14
 */
import { Middleware, Helper, Value } from "koatty";
import { App } from '../App';
const jwt = require('jsonwebtoken');

const defaultOpt = {
    //默认配置项
};


@Middleware()
export class Token {
    @Value("encoding")
    encoding: string;
    run(options: any, app: App) {
        options = Helper.extend(defaultOpt, options);
        const encoding = this.encoding || "utf-8";
        //应用启动执行一次
        // app.once('appReady', () => { });

        return function (ctx: any, next: any) {
            //忽略验证token的控制器
            const regUrl = options.url || [];
            let flag = regUrl.some((it: string | RegExp) => {
                return new RegExp(it).test(ctx.path);
            });
            if (ctx.path === '/') {
                flag = true;
            }
            if (flag) {
                return next();
            }
            const token = ctx.get('x-access-token') || ctx.param('accessToken');
            // tslint:disable-next-line: one-variable-per-declaration
            let userid = '', roleid = '';

            try {
                if (Helper.isEmpty(token)) {
                    // return ctx.json
                    ctx.type = 'content-type: application/json; charset=' + encoding;
                    ctx.body = { status: 0, code: 401, message: 'TOKEN签名丢失', 'data': { needLogin: 1 } };
                    return;
                }
                const decoded = jwt.decode(token, { complete: true }, options.key || '');
                if (Helper.isEmpty(decoded) || Helper.isEmpty(decoded.payload) || Helper.isEmpty(decoded.payload.iss)) {
                    // return ctx.json
                    ctx.type = 'content-type: application/json; charset=' + encoding;
                    ctx.body = { status: 0, code: 401, message: 'TOKEN无效', 'data': { needLogin: 1 } };
                    return;
                }
                userid = decoded.payload.iss || '';
                roleid = decoded.payload.rid || '';
            } catch (e) {
                userid = '';
                roleid = '';
            }
            //verify
            try {
                jwt.verify(token, options.key);
            } catch (err) {
                // return ctx.json
                if (err.message && err.message.indexOf('expired') > -1) {
                    ctx.type = 'content-type: application/json; charset=' + encoding;
                    ctx.body = { status: 0, code: 401, message: 'TOKEN已经过期', 'data': { needLogin: 1 } };
                    return;
                } else {
                    ctx.type = 'content-type: application/json; charset=' + encoding;
                    ctx.body = { status: 0, code: 401, message: 'TOKEN无效', 'data': { needLogin: 1 } };
                    return;
                }
            }

            if (Helper.isEmpty(userid)) {
                ctx.type = 'content-type: application/json; charset=' + encoding;
                ctx.body = { status: 0, code: 401, message: '请重新登陆', 'data': { needLogin: 1 } };
                return;
            }
            ctx.userid = userid;
            ctx.roleid = roleid;
            return next();
        };
    }
}