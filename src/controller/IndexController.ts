/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-11-04 19:55:38
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
    /**
    * @api {get} / 查询
    * @apiGroup TEST
    * 
    * 
    * @apiParam {String} test  测试.
    * 
    * @apiSuccessExample {json} Success
    * {"status":1,"code":200,"message":"","data":{}}
    * 
    * @apiErrorExample {json} Error
    * {"status":0,"code":500,"message":"错误信息","data":{}}
    */
    @RequestMapping("/", RequestMethod.GET)
    async default(@Get("test") test: string) {
        const info = await this.testService.sayHello();
        this.assign('test', test || "test");
        this.assign('info', info);
        return this.render('./index.html');
    }

    /**
    * @api {POST} / 新增
    * @apiGroup TEST
    * 
    * 
    * @apiParam {String} body  XXXXXX.
    * 
    * @apiSuccessExample {json} Success
    * {"status":1,"code":200,"message":"","data":{}}
    * 
    * @apiErrorExample {json} Error
    * {"status":0,"code":500,"message":"错误信息","data":{}}
    */
    @PostMaping()
    async test(@RequestBody() body: any) {
        // return this.default('aaa');
        const info = await this.testService.sayHello2('test');
        return this.ok(`body: ${JSON.stringify(body)}`, info);
    }

    /**
    * @api {PUT} / 更新
    * @apiGroup TEST
    * 
    * 
    * @apiParam {String} postbody  XXXXXX.
    * 
    * @apiSuccessExample {json} Success
    * {"status":1,"code":200,"message":"","data":{}}
    * 
    * @apiErrorExample {json} Error
    * {"status":0,"code":500,"message":"错误信息","data":{}}
    */
    @PutMaping()
    async helloword(@Post() param: any) {
        const info = await this.testService.sayHello5(param.name);
        return this.ok("ok", info);
    }
}