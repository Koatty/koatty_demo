/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-10-17 14:08:38
 */
import * as Koa from "Koa";
import { App } from "../App";
import { Controller, BaseController, Autowired, Get, Post, Param } from "koatty";
import { TestService } from "../service/TestService";

@Controller()
export class IndexController extends BaseController {
    public ctx: Koa.BaseContext;
    public app: App;

    @Autowired()
    private testService: TestService;

    init() {
        //...
    }

    @Get("/")
    async default() {
        const info = await this.testService.sayHello();
        return this.ok('Hello, Koatty!', info);
    }

    @Post("/test")
    test() {
        return this.ok("test", this.param());
    }
}