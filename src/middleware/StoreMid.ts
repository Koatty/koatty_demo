/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-11-14 19:20:33
 */
import { Middleware, Helper, Value } from "koatty";
const store = require("think_store");


@Middleware()
export class StoreMid {
    @Value("redis", "db")
    private options: any;
    run(options: any, app: any) {
        options = { ...this.options, ...options };
        Helper.define(app, "store", new store(options));

        return function (ctx: any, next: any) {
            return next();
        };
    }
}