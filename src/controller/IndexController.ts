/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-10-18 10:37:56
 */
import * as Koa from "Koa";
import { App } from "../App";
import { Controller, BaseController, Autowired, GetMaping, RequestBody, PathVariable, PostMaping } from "koatty";
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

    @GetMaping("/")
    async default(@PathVariable("test") test: string) {
        const info = await this.testService.sayHello();
        return this.ok('Hello, Koatty!', info);
    }

    @PostMaping("/test")
    test(@RequestBody() body: any) {
        return this.ok("test", body);
    }
}