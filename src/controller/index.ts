/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-10-12 18:45:40
 */
import { Controller, BaseController, All, Autowired } from "koatty";
import { test } from '../service/test';

@Controller()
export class index extends BaseController {
    @Autowired('test')
    private testService: test;
    init() {
        //...
    }

    @All("/")
    default() {
        const info = this.testService.sayHello('test');
        return this.ok(info);
    }
}