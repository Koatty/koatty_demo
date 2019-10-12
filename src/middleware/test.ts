/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-10-12 17:51:01
 */
import * as Koa from "koa";
import { Middleware, helper, logger } from "koatty";
const defaultOpt = {
    //默认配置项
};


@Middleware()
export class test {
    run(options: any, app: any) {
        options = helper.extend(defaultOpt, options);
        //应用启动执行一次
        // app.once('appReady', () => { });

        return function (ctx: Koa.Context, next: any) {
            logger.info('test middleware');
            return next();
        };
    }
}