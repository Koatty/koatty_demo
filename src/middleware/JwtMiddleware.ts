/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2020-05-12 00:08:19
 */
import { Middleware, Helper } from "koatty";
import { App } from '../App';
const jwt = require("think_jwt");

const defaultOpt = {
    //默认配置项
};


@Middleware()
export class JwtMiddleware {
    run(options: any, app: App) {
        return jwt(options, app);
    }
}