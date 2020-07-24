/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2020-05-11 23:37:17
 */
import { Middleware, Helper, IMiddleware } from "koatty";
import { App } from '../App';
const statics = require("think_static");

@Middleware()
export class StaticMiddleware implements IMiddleware {
    run(options: any, app: App) {
        return statics(options, app);
    }
}