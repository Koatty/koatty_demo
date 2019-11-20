/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-11-20 15:15:08
 */
import { Middleware, Helper } from "koatty";
import { App } from '../App';
const views = require("think_view");

const defaultOpt = {
    //默认配置项
};


@Middleware()
export class View {
    run(options: any, app: App) {
        return views(options, app);
    }
}