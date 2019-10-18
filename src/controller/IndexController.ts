/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-10-18 17:31:35
 */
import { Controller, BaseController, Autowired, GetMaping, RequestBody, PathVariable, PostMaping, BaseApp, RequestMapping, RequestMethod } from "koatty";
import { TestService } from "../service/TestService";

interface App extends BaseApp {
    cache: any;
}

@Controller()
export class IndexController extends BaseController {
    app: App;

    @Autowired()
    private testService: TestService;

    init() {
        //...
        this.app.cache = {};
        console.log('IndexController.init()', this.app.cache);
    }

    @RequestMapping("/", RequestMethod.ALL)
    async default(@PathVariable("test") test: string) {
        const info = await this.testService.sayHello();
        return this.ok(test, info);
    }

    @PostMaping("/test")
    test(@RequestBody() body: any) {
        // return this.default('aaa');
        return this.ok("test", body);
    }
}