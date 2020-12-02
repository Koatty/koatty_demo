/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2020-05-10 15:02:26
 */
import { Controller, BaseController, GetMapping, RequestMapping, RequestMethod } from "koatty";
import { App } from '../../App';
const request = require("think_request");

@Controller()
export class WebIndexController extends BaseController {
    app: App;

    init() {
        //...
    }

    @GetMapping("/")
    index() {
        // this.ctx.status = 201;
        // return this.ctx.render('./html/index.html');
        return this.ok("hello");
    }

    @RequestMapping("/client", RequestMethod.GET)
    async httpClient() {
        const res = await request({}, "https://baidu.com");
        return res;
    }
}
