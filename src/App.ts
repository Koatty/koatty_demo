/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-11-05 21:27:35
 */
import { Koatty, Bootstrap } from "koatty";
// import * as path from "path";

@Bootstrap()
// @ComponentScan('./')
// @ConfiguationScan('./config')
export class App extends Koatty {
    cacheStore: any;

    public init() {
        // this.root_path = path.dirname(__dirname);
        // this.app_debug = true; //线上环境请将debug模式关闭，即：app_debug:false
    }
}
