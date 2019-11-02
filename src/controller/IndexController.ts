/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-11-02 11:52:11
 */
import { Controller, BaseController, Autowired, GetMaping, RequestBody, PathVariable, PostMaping, RequestMapping, RequestMethod, PutMaping, Post, Get } from "koatty";
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

    @RequestMapping("/", RequestMethod.GET)
    async default(@Get("test") test: string) {
        const info = await this.testService.sayHello();
        this.assign('test', test || "test");
        this.assign('info', info);
        return this.render('./index.html');
    }

    @PostMaping()
    async test(@RequestBody() body: any) {
        // return this.default('aaa');
        const info = await this.testService.sayHello2('test');
        return this.ok(`body: ${JSON.stringify(body)}`, info);
    }

    @PutMaping()
    async helloword(@Post() param: any) {
        const info = await this.testService.sayHello5(param.name);
        return this.ok("ok", info);
    }
}