/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-10-16 20:00:47
 */
import { App } from "../App";
import * as Koa from "Koa";
import { Controller, BaseController, All, Autowired } from "koatty";
import { TestService } from '../service/TestService';

@Controller()
export class IndexController extends BaseController {
    public app: App;
    public ctx: Koa.BaseContext;

    @Autowired()
    private testService: TestService;
    init() {
        //...
    }

    @All("/")
    async default() {
        const info = await this.testService.sayHello2('test').catch(() => {
            console.log('aaaaaaaaaaaa');
        });
        return this.ok('aaaaaaaaa', info);
    }
}