/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2020-05-12 00:08:19
 */
import { Middleware, Helper, IMiddleware } from "koatty";
import { App } from '../App';
const jwt = require("think_jwt");

@Middleware()
export class JwtMiddleware implements IMiddleware {
    run(options: any, app: App) {
        return jwt(options, app);
    }
}