/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-10-23 14:12:17
 */
import { Controller, BaseController, Autowired, GetMaping, RequestBody, PathVariable, PostMaping, BaseApp, RequestMapping, RequestMethod } from "koatty";
import { TestService } from "../service/TestService";

@Controller()
export class IndexController extends BaseController {

    @Autowired()
    private testService: TestService;

    init() {
        //...
    }

    @RequestMapping("/", RequestMethod.ALL)
    async default(@PathVariable("test") test: string) {
        const info = await this.testService.sayHello();
        this.assign('test', test);
        this.assign('info', info);
        return this.render('./index.html');
    }

    @PostMaping("/test")
    async test(@RequestBody() body: any) {
        // return this.default('aaa');
        const info = await this.testService.sayHello2('test');
        return this.ok(`body: ${JSON.stringify(body)}`, info);
    }
}