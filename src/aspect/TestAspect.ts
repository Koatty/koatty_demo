/*
 * @Description: AOP切面类
 * @Usage: 
 * @Author: xxx
 * @Date: 2020-12-22 15:24:25
 * @LastEditTime: 2022-08-19 15:45:36
 */

import { Aspect, IAspect, Logger } from "koatty";
import { App } from '../App';
import { UserDto } from "../dto/UserDto";

@Aspect()
export class TestAspect implements IAspect {
    app: App;

    run(user: UserDto) {
        Logger.Debug(user);
        return Promise.resolve();
    }
}