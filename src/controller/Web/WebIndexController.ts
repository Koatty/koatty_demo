/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2020-05-10 15:02:26
 */
import { Controller, BaseController, GetMapping } from "koatty";
import { App } from '../../App';

@Controller()
export class WebIndexController extends BaseController {
    app: App;

    init() {
        //...
    }

    @GetMapping("/")
    index() {
        return this.ctx.render('./html/index.html');
    }
}
