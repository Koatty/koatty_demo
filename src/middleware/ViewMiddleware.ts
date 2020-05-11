/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2020-05-11 23:22:19
 */
import { Middleware, Helper } from "koatty";
import { App } from '../App';
const views = require("think_view");

const defaultOpt = {
    //默认配置项
};


@Middleware()
export class ViewMiddleware {
    run(options: any, app: App) {
        return views(options, app);
    }
}