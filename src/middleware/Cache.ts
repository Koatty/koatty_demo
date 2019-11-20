/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-11-20 15:04:57
 */
import { Middleware, Helper, Value } from "koatty";
import { App } from '../App';
const store = require("think_store");


const defaultOpt = {
    //默认配置项
};


@Middleware()
export class Cache {
    @Value("redis", "db")
    options: any;

    run(options: any, app: App) {
        options = Helper.extend(defaultOpt, this.options);
        //应用启动执行一次
        app.once('appReady', () => {
            Helper.define(app, 'cacheStore', new store(options));
        });

        return function (ctx: any, next: any) {
            return next();
        };
    }
}