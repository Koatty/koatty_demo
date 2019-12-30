/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-11-28 14:41:12
 */
import { Controller, BaseController, GetMaping } from "koatty";
import { App } from '../../App';

@Controller()
export class WebIndexController extends BaseController {
    app: App;

    init() {
        //...
    }

    @GetMaping("/")
    index() {
        return this.render('./html/index.html');
    }
}
