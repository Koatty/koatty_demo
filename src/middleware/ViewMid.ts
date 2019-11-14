/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-11-14 19:21:27
 */
import { Middleware } from "koatty";
const view = require('think_view');

@Middleware()
export class ViewMid {
    run(options: any, app: any) {
        return view(options, app);
    }
}