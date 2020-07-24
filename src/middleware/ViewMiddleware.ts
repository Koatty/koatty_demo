/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2020-05-11 23:22:19
 */
import { Middleware, Helper, IMiddleware } from "koatty";
import { App } from '../App';
const views = require("think_view");

@Middleware()
export class ViewMiddleware implements IMiddleware {
    run(options: any, app: App) {
        return views(options, app);
    }
}