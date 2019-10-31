/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-10-31 09:45:56
 */
import { Controller, BaseController, Autowired, GetMaping, RequestBody, PathVariable, PostMaping, RequestMapping, RequestMethod } from "koatty";
import { TestService } from "../service/TestService";
import { App } from '../App';

@Controller()
export class IndexController extends BaseController {
    app: App;

    @Autowired()
    private testService: TestService;

    init() {
        //...
        this.app.test = '';
    }

    @RequestMapping("/", RequestMethod.ALL)
    async default(@PathVariable("test") test: string) {
        const info = await this.testService.sayHello();
        this.assign('test', test || "test");
        this.assign('info', info);
        return this.render('./index.html');
    }

    @PostMaping("/test")
    async test(@RequestBody() body: any) {
        // return this.default('aaa');
        const info = await this.testService.sayHello2('test');
        return this.ok(`body: ${JSON.stringify(body)}`, info);
    }

    @GetMaping("/helloword")
    async helloword(@PathVariable("username") username: string) {
        const info = await this.testService.sayHello5(username);
        return this.ok("ok", info);
    }
}