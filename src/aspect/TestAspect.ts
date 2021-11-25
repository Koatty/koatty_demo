/*
 * @Description: AOP切面类
 * @Usage: 
 * @Author: xxx
 * @Date: 2020-12-22 15:24:25
 * @LastEditTime: 2021-07-12 16:06:28
 */

import { Aspect, IAspect } from "koatty";
import { App } from '../App';

@Aspect()
export class TestAspect implements IAspect {
    app: App;

    run(name: string) {
        console.log(name);
        return Promise.resolve();
    }
}