/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-11-20 15:10:59
 */
import { Controller, GetMapping } from "koatty";
import { App } from '../../App';
import { AdminController } from "../AdminController";

@Controller("/admin")
export class IndexController extends AdminController {
    app: App;
    pageInfo: { 'appName': string; 'appVersion': string; 'appKeywords': string; 'appDescription': string; };

    @GetMapping("/")
    @GetMapping("/index")
    index() {
        this.pageInfo = {
            'appName': this.app.config('app_title'),
            'appVersion': this.app.config('app_version'),
            'appKeywords': this.app.config('app_keywords'),
            'appDescription': this.app.config('app_description')
        };
        return this.ok('Hello, Koatty!');
    }
}
