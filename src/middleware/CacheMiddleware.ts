/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2020-05-11 23:44:33
 */
import { Middleware, Helper, IMiddleware } from "koatty";
import { App } from '../App';
const cache = require("think_cache");

@Middleware()
export class CacheMiddleware implements IMiddleware {
    run(options: any, app: App) {
        return cache(options, app);
    }
}