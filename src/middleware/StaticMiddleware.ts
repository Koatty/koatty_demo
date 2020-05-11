/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2020-05-11 23:37:17
 */
import { Middleware, Helper } from "koatty";
import { App } from '../App';
const statics = require("think_static");


const defaultOpt = {
    //默认配置项
};


@Middleware()
export class StaticMiddleware {
    run(options: any, app: App) {
        return statics(options, app);
    }
}