/*
 * @Description: AOP切面类
 * @Usage: 
 * @Author: xxx
 * @Date: 2020-12-22 15:24:25
 * @LastEditTime: 2024-10-29 15:49:33
 */

import { Aspect, Exception, IAspect, Logger } from "koatty";
import { App } from '../App';

@Aspect()
export class AuthAspect implements IAspect {
  app: App;

  async run(token: string) {
    Logger.Debug("token:" + token);
    const isLogin = await this.checkLogin(token);
    if (isLogin) {
      return Promise.resolve();
    } else {
      throw new Exception("no login", 1, 200);
    }
  }

  checkLogin(token: string): boolean {
    return token.toLocaleLowerCase() === 'koatty';
  }
}
