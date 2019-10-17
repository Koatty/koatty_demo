/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-10-17 11:44:30
 */
import * as Koa from "Koa";
import { App } from "../App";
import { Controller, BaseController, Autowired, Get } from "koatty";
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
}